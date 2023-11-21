import express from "express";
import db from "./model/sequelize.js";
import dotenv from "dotenv";
import cookies from 'cookie-parser'
import userRouter from "./routes/user.js";
import verifyJWT from './middleware/verifyJWT.js'

dotenv.config();

// Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookies());
app.use(userRouter);
app.use(verifyJWT);
app.get('/', (req, res) => {
    res.send('Hello World, ' + req.username)
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));