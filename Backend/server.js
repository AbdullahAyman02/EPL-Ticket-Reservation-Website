import express from "express";
import db from "./model/sequelize.js";
import dotenv from "dotenv";
import cookies from 'cookie-parser'
import userRouter from "./routes/user.js";
import matchRouter from "./routes/match.js";
import refereeRouter from "./routes/referee.js";
import teamRouter from "./routes/team.js";
import stadiumRouter from "./routes/stadium.js";
import verifyJWT from './middleware/verifyJWT.js'
import cors from 'cors'

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

dotenv.config();
var corsOptions = {
    origin: 'http://localhost:${process.env.PORT}/verify/${token}',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
  
  
// Test DB
db.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error: ' + err))
  
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookies());
app.use(userRouter);
app.use(matchRouter);
app.use(teamRouter);
app.use(refereeRouter);
app.use(stadiumRouter);
app.use(verifyJWT);
app.get('/', (req, res) => {
    res.send('Hello World, ' + req.username)
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));