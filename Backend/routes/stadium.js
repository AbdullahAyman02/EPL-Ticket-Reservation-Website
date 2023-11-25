import { Route, Router } from "express";
import {
    getStadiums,
    addStadium,
} from "../controllers/stadiumController.js";

const stadiumRouter = Router();

stadiumRouter.get("/getStadiums", getStadiums);
stadiumRouter.post("/addStadium", addStadium);

export default stadiumRouter;
