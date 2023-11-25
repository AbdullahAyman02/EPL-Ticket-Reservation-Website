import { Route, Router } from "express";
import {
    getStadiums,
} from "../controllers/stadiumController.js";

const stadiumRouter = Router();

stadiumRouter.get("/getStadiums", getStadiums);

export default stadiumRouter;
