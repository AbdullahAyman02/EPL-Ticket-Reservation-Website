import { Route, Router } from "express";
import verifyJWT  from "../middleware/verifyJWT.js";
import {
    getTeams,
} from "../controllers/teamController.js";

const teamRouter = Router();

teamRouter.use(verifyJWT('M'));
teamRouter.get("/getTeams", getTeams);

export default teamRouter;
