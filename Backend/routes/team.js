import { Route, Router } from "express";
import {
    getTeams,
} from "../controllers/teamController.js";

const teamRouter = Router();

teamRouter.get("/getTeams", getTeams);

export default teamRouter;
