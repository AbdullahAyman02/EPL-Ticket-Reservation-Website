import { Route, Router } from "express";
import {
    getReferees,
} from "../controllers/refereeController.js";

const refereeRouter = Router();

refereeRouter.get("/getReferees", getReferees);

export default refereeRouter;
