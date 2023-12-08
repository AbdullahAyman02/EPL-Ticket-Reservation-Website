import { User } from "../model/model.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

dotenv.config();

const handleSignup = async (req, res) => {
  console.log("Data received: ", req.body);
  const {
    username,
    password,
    firstName: first_name,
    lastName: last_name,
    birthday,
    gender,
    city,
    address,
    email,
  } = req.body;
  
  try {

    // All fields are required, except address
    if(!username || !password || !first_name || !last_name || !birthday || !gender || !city || !email) {
      return res.status(400).json({
        status: "Bad Request",
        message: "All fields except address are required",
      });
    }

    console.log(1);

    // Birthday must be in the past
    if (new Date(birthday) > new Date()) {
      return res.status(400).json({
        status: "Bad Request",
        message: "Birthday must be in the past",
      });
    }

    console.log(2);

    // Check if username already exists
    const is_exist = await User.findOne({ where: { username: username } });
    if (is_exist) {
      return res.status(400).json({
        status: "Bad Request",
        message: "Username already exists",
      });
    }

    console.log(1);

    //Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.create({
      username,
      password: hashedPassword,
      first_name,
      last_name,
      birthday,
      gender,
      city,
      address,
      email,
      role: 'F',
      refresh_token: null,
      is_verified: false,
    }).catch((err) => {
      console.log("Error: ", err);
      return res.status(500).json({
        status: "fail",
        message: "Email already exists",
      });
    });
    
    await SendEmail(req, res);

    res.status(200).json({
      status: "success",
      username: user.username,    
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({
        status: "Bad Request",
        message: "Username and password are required",
      });
    }

    const userData = await User.findOne({ where: { username: username } });

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
        role: userData.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "5m",
      }
    );

    const refreshToken = jwt.sign(
      { username: userData.username },
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
      status: "success",
      accessToken,
      username: userData.username,
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
  // console.log(cookies);
  if (!cookies?.jwt) return res.sendStatus(204); //No content already
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({
    where: { refresh_token: refreshToken },
  });
  // console.log(foundUser);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  if (!foundUser) {
    return res.sendStatus(204);
  }

  //2. Remove Refresh Token from Database
  foundUser.refresh_token = null;
  foundUser.save();
  res.sendStatus(200);
};

const getUserbyUsername = async (req, res) => {
  const username = req.params.username;
  console.log(username);
  try {
    const user = await User.findOne({
      attributes: ['username', 'first_name', 'last_name', 'birthday', 'gender', 'city', 'address', 'email'],
      where: {
        username: username,
      },
    });
    res.status(200).json({
      status: "success",
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err,
    });   
  }
}; 

const handleEdit = async (req, res) => {
  const {
    username,
    password,
    firstName: first_name,
    lastName: last_name,
    birthday,
    gender,
    city,
    address,
  } = req.body;

  try {
    // All fields are required, except address

    // Birthday must be in the past
    if (new Date(birthday) > new Date()) {
      return res.status(400).json({
        status: "Bad Request",
        message: "Birthday must be in the past",
      });
    }

    let user;

    // check if password is entered and not null, if null do not update it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.update({
        password: hashedPassword,
        first_name,
        last_name,
        gender,
        city,
        address,
      }, {
        where: {
          username: username,
        },
      });
    }
    else {
        user = await User.update({
        first_name,
        last_name,
        birthday,
        gender,
        city,
        address,
      }, {
        where: {
          username: username,
        },
      });
    }
    res.status(200).json({
      status: "success",
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

const handleRefresh = async (req, res) => {
  console.log("Refresh Token Requested");
  //1. Retrieve Refresh Token from Client
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    console.log("No Refresh Token Found");
    return res.sendStatus(401);
  }
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({
    where: { refresh_token: refreshToken },
  });
  if (!foundUser) {
    return res.sendStatus(401);
  }
  console.log("Refresh Token Found");

  //2. Check Validity and Generate new Access Token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || decoded.username !== foundUser.username) return res.sendStatus(403);
  });

  const accessToken = jwt.sign(
    {
      role: foundUser.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "5m",
    }
  );

  res.status(200).json({
    status: "success",
    accessToken,
  });
};

const SendEmail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "eplmanagement03@gmail.com",
      pass: "fnlfcqvgxtzbgwey",
    },
    tls: {
      rejectUnauthorized: false,
    }
  });

  const token = jwt.sign(
    {
      username: req.body.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );

  const encodedToken = Buffer.from(token).toString('base64');

  const mailConfigurations = {
    // It should be a string of sender/server email
    from: "eplmanagement03@gmail.com",

    to: req.body.email,

    // Subject of Email
    subject: "Email Verification",

    // This would be the text of email body
    text: `Hi! There, You have recently visited 
          our website and entered your email.
          Please follow the given link to verify your email
          http://localhost:5173/verify/${encodedToken} 
          Thanks`,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    console.log("Email Sent Successfully");
    console.log(info);
  });
};

const UpgradeUser = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(404).json({
        status: "Not Found",
        message: "User does not exist",
      });
    }

    user.role = 'M';
    user.save();

    res.status(200).json({
      status: "success",
      message: "User successfully upgraded",
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
}

const deleteUser = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(404).json({
        status: "Not Found",
        message: "User does not exist",
      });
    }

    user.destroy();

    res.status(200).json({
      status: "success",
      message: "User successfully deleted",
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
}

const handleVerify = async (req, res) => {
  const { token } = req.params;
  console.log(token);

  if (!token) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Token is required",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findOne({ where: { username: decoded.username } });

    if (!user) {
      return res.status(404).json({
        status: "Not Found",
        message: "User does not exist",
      });
    }

    // Email included in refresh token payload to check associativity when used again
    const refreshToken = jwt.sign(
      { username: decoded.username },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    console.log(user);
    const accessToken = jwt.sign(
      {
        role: user.role,
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
      accessToken,
      username: user.username,
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  }
};

export { handleSignup, handleLogin, handleLogout, getUserbyUsername, handleEdit, handleRefresh, UpgradeUser, deleteUser, handleVerify };
