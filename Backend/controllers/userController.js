import { User } from "../model/model.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

dotenv.config();

const handleSignup = async (req, res) => {
  const { email, password, display_name } = req.body;

  //All fields are required
  if (!email || !password || !display_name) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Email, password and display_name are required",
    });
  }

  try {
    //Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.create({
      email,
      password: hashedPassword,
      display_name,
      refresh_token: null,
      is_verified: false,
    });

    await SendEmail(req, res);

    res.status(201).json({
      status: "success",
      email: user.email,
      display_name: user.display_name,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Email and password are required",
    });
  }
  try {
    const userData = await User.findOne({ where: { email: email } });

    if (!userData) {
      return res.status(404).json({
        status: "Not Found",
        message: "User does not exist",
      });
    }

    if (!userData.is_verified) {
      return res.status(404).json({
        status: "Not Found",
        message: "User is not verified",
      });
    }

    const authenticated = await bcrypt.compare(password, userData.password);
    if (!authenticated) {
      return res.status(404).json({
        status: "Not Found",
        message: "Password is incorrect",
      });
    }

    const accessToken = jwt.sign(
      {
        id: userData.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "5m",
      }
    );

    const refreshToken = jwt.sign(
      { email: userData.email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    //Latest refreshToken overwrites the previous one in database
    userData.refresh_token = refreshToken;
    userData.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "Success",
      data: {
        accessToken,
        email: userData.email,
        display_name: userData.display_name,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

const handleLogout = async (req, res) => {
  //1. Remove Refresh Token from Client
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content already
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({
    where: { refresh_token: refreshToken },
  });
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  if (!foundUser) {
    return res.sendStatus(204);
  }

  //2. Remove Refresh Token from Database
  foundUser.refresh_token = null;
  foundUser.save();
  res.sendStatus(204);
};

const handleRefresh = async (req, res) => {
  //1. Retrieve Refresh Token from Client
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({
    where: { refresh_token: refreshToken },
  });
  if (!foundUser) {
    return res.sendStatus(401);
  }

  //2. Check Validity and Generate new Access Token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || decoded.email !== foundUser.email) return res.sendStatus(403);
  });

  const accessToken = jwt.sign(
    {
      id: foundUser.id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "5m",
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      name: foundUser.display_name,
      accessToken,
      email: foundUser.email,
      display_name: foundUser.display_name,
    },
  });
};

const SendEmail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ballerzfauwusa@gmail.com",
      pass: "vhsatabazvnyxksu",
    },
    tls: {
      rejectUnauthorized: false,
    }
  });

  const token = jwt.sign(
    {
      email: req.body.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );

  const mailConfigurations = {
    // It should be a string of sender/server email
    from: "ballerzfauwusa@gmail.com",

    to: req.body.email,

    // Subject of Email
    subject: "Email Verification",

    // This would be the text of email body
    text: `Hi! There, You have recently visited 
          our website and entered your email.
          Please follow the given link to verify your email
          http://localhost:5000/verify/${token} 
          Thanks`,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    console.log("Email Sent Successfully");
    console.log(info);
  });
};

const handleVerify = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Token is required",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) {
      return res.status(404).json({
        status: "Not Found",
        message: "User does not exist",
      });
    }

    // Email included in refresh token payload to check associativity when used again
    const refreshToken = jwt.sign(
      { email: decoded.email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    console.log(user);
    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "5m",
      }
    );

    user.refresh_token = refreshToken;
    user.is_verified = true;
    user.save();

    // higher security as it becomes inaccessible by javascript
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      message: "User successfully verified",
      data: {
        accessToken,
        email: user.email,
        display_name: user.display_name,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

export { handleSignup, handleLogin, handleLogout, handleRefresh, handleVerify };
