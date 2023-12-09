import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const verifyJWT = (role = 'F') => {
        return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401);
        const token = authHeader.split(' ')[1];
        console.log(role)
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.status(403); //invalid token
                if (decoded.role != role) return res.status(401);
                console.log("verified");
                next();
            }
        );
        console.log("here");
    }
}

export default verifyJWT;