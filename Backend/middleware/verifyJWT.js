import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const verifyJWT = (role = 'F') => {
        return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.sendStatus(401);
        const token = authHeader.split(' ')[1];
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.sendStatus(403); //invalid token
                if (decoded.role != role) return res.sendStatus(401);
                console.log(decoded);
                next();
            }
        );
    }
}

export default verifyJWT;