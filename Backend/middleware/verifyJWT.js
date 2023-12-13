import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const verifyJWT = (roles = []) => {
        return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401);
        const token = authHeader.split(' ')[1];
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.status(403); //invalid token
                if (!roles.includes(decoded.role)) return res.status(401);
                next();
            }
        );
    }
}

export default verifyJWT;