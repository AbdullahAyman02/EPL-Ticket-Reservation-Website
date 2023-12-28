import { Router } from "express";
import verifyJWT  from "../middleware/verifyJWT.js";

import {
    getStadiums,
    addStadium,
} from "../controllers/stadiumController.js";

const stadiumRouter = Router();

stadiumRouter.use(verifyJWT(['M']));
stadiumRouter.get("/getStadiums", getStadiums);
stadiumRouter.post("/addStadium", addStadium);

export default stadiumRouter;
