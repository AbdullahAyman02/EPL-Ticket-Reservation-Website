import { Router } from "express";
import verifyJWT  from "../middleware/verifyJWT.js";
import {
    getTicketsByMatchID,
    addTicket,
    deleteTicket,
    getTicketsByUsername
} from "../controllers/ticketController.js";

const ticketRouter = Router();

ticketRouter.get("/getTicketsByMatchID/:id", verifyJWT(['M', 'F']), getTicketsByMatchID);
ticketRouter.get("/getTicketsByUsername/:username", verifyJWT['M', 'F'], getTicketsByUsername);
ticketRouter.use(verifyJWT(['F']));
ticketRouter.post("/addTicket", addTicket);
ticketRouter.delete("/deleteTicket/:ticket_no", deleteTicket);

export default ticketRouter;
