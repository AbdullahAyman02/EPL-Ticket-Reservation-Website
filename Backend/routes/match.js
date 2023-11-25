import { Route, Router } from "express";
import {
    addMatch,
    getMatch,
    editMatch
} from "../controllers/matchController.js";

const matchRouter = Router();

matchRouter.post("/addMatch", addMatch);
matchRouter.get("/getMatch", getMatch);
matchRouter.put("/editMatch", editMatch);

export default matchRouter;
