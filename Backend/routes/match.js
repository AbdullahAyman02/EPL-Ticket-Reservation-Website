import { Route, Router } from "express";
import verifyJWT  from "../middleware/verifyJWT.js";
import {
    addMatch,
    getMatches,
    getMatchById,
    editMatch
} from "../controllers/matchController.js";

const matchRouter = Router();

matchRouter.get("/getMatches", getMatches);
matchRouter.get("/getMatchById/:id", getMatchById);

matchRouter.use(verifyJWT(['M']));

matchRouter.post("/addMatch", addMatch);
matchRouter.put("/editMatch", editMatch);

export default matchRouter;
