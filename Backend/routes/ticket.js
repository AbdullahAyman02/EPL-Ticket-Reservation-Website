import { Route, Router } from "express";
import verifyJWT  from "../middleware/verifyJWT.js";
import {
    getTicketsByMatchID,
    addTicket,
    deleteTicket,
    getTicketsByUsername
} from "../controllers/ticketController.js";

const ticketRouter = Router();

ticketRouter.get("/getTicketsByMatchID/:id", verifyJWT(['M', 'F']), getTicketsByMatchID);
ticketRouter.use(verifyJWT(['F']));
ticketRouter.get("/getTicketsByUsername/:username", getTicketsByUsername);
ticketRouter.post("/addTicket", addTicket);
ticketRouter.delete("/deleteTicket/:ticket_no", deleteTicket);

export default ticketRouter;
