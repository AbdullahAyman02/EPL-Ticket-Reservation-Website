import { Route, Router } from "express";
import verifyJWT  from "../middleware/verifyJWT.js";
import {
    getReferees,
} from "../controllers/refereeController.js";

const refereeRouter = Router();

refereeRouter.use(verifyJWT('M'));
refereeRouter.get("/getReferees", getReferees);

export default refereeRouter;
