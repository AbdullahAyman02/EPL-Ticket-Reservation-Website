import { Route, Router } from "express";
import {
    getTicketsByMatchID,
    addTicket,
    deleteTicket
} from "../controllers/ticketController.js";

const ticketRouter = Router();

ticketRouter.get("/getTicketsByMatchID/:id", getTicketsByMatchID);
ticketRouter.post("/addTicket", addTicket);
ticketRouter.delete("/deleteTicket/:ticket_no", deleteTicket);

export default ticketRouter;
