import express from "express";
import db from "./model/sequelize.js";
import dotenv from "dotenv";
import cookies from 'cookie-parser'
import userRouter from "./routes/user.js";
import matchRouter from "./routes/match.js";
import refereeRouter from "./routes/referee.js";
import teamRouter from "./routes/team.js";
import stadiumRouter from "./routes/stadium.js";
import ticketRouter from "./routes/ticket.js";
import verifyJWT from './middleware/verifyJWT.js'
import cors from 'cors'

dotenv.config();
var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials: true,
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

app.use("/user", userRouter); //localhost:5000/user/login
app.use("/match", matchRouter);

app.use("/ticket", ticketRouter);

app.use("/team", teamRouter);
app.use("/referee", refereeRouter);
app.use("/stadium", stadiumRouter);

app.get('/', (req, res) => {
    res.send('Hello World, ' + req.username)
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));