import { Route, Router } from "express";
import {
    addMatch,
    getMatches,
    getMatchById,
    editMatch
} from "../controllers/matchController.js";

const matchRouter = Router();

matchRouter.post("/addMatch", addMatch);
matchRouter.get("/getMatches", getMatches);
matchRouter.get("/getMatchById/:id", getMatchById);
matchRouter.put("/editMatch", editMatch);

export default matchRouter;
