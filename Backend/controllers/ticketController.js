import { parse } from "dotenv";
import { Ticket } from "../model/model.js";
import { Match } from "../model/model.js";
import { Stadium } from "../model/model.js";
import { Team } from "../model/model.js";

const getTicketsByMatchID = async (req, res) => {
    console.log("ana f getTIcketsByMatchID\n");
    try {
        // Check if match exists
        const match = await Match.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!match) {
            res.status(404).json({
                status: "fail",
                message: "Match not found",
            });
            return;
        }

        const tickets = await Ticket.findAll({
            attributes:['seat_no', 'username'],
            where: {
                match_id: req.params.id
            }
        });

        // const seatNumbers = tickets.map(ticket => ticket.seat_no);

        res.status(200).json({
            status: "success",            
            tickets: tickets,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "fail",
            message: err,
        });
    }
};

const addTicket = async (req, res) => {
    const {
        match_id,
        seat_no,
        username
    } = req.body;
    
    try{
        // Check if match exists
        const match = await Match.findOne({
            include: [
                {
                    model: Stadium,
                    as: 'stadium',
                    attributes: ['id', 'no_of_rows', 'seats_per_row'],
                },
            ],
            where: {
                id: match_id
            }
        });

        if (!match) {
            res.status(404).json({
                status: "fail",
                message: "Match not found",
            });
            return;
        }

        // Check if match already played
        const match_date = match.date.toISOString().slice(0, 16);
        const today = new Date();
        const today_date = today.toISOString().slice(0, 16);
        if (match_date < today_date) {
            res.status(409).json({
                status: "fail",
                message: "Match already played",
            });
            return;
        }

        // // Check if seat number is valid
        // const stadium = match.stadium;
        // const no_of_rows = stadium.no_of_rows;
        // const seats_per_row = stadium.seats_per_row;
        // if (seat_no > no_of_rows * seats_per_row) {
        //     res.status(409).json({
        //         status: "fail",
        //         message: "Invalid seat number",
        //     });
        //     return;
        // }

        // // Check if seat is already taken
        // const is_exist = await Ticket.findOne({
        //     where: {
        //         match_id: match_id,
        //         seat_no: seat_no
        //     }
        // });

        // if (is_exist) {
        //     res.status(409).json({
        //         status: "fail",
        //         message: "Seat already taken",
        //     });
        //     return;
        // }

        // Generate a random ticket number
        // Function to generate a more complicated and unique ticket number using only numbers
        // Use a combination of match ID, seat number, timestamps, and random numbers
        // get date in date format
        // const timestamp = new Date().toISOString().slice(0, 10);
        // const randomNumbers = Math.floor(Math.random() * 1000);
        // const formattedMatchId = match_id.toString() + "000"; 
        // const formattedSeatNumber = seat_no.toString() + "000";
        // // const ticket_no = parseInt(`${formattedMatchId}${formattedSeatNumber}${timestamp}${randomNumbers}`);
        // // const ticket_no = parseInt(`${formattedMatchId}${formattedSeatNumber}${timestamp}`);
        // const ticket_no = parseInt(`${formattedMatchId}${formattedSeatNumber}`);

        // const ticket = await Ticket.create({
        //     ticket_no,
        //     match_id,
        //     seat_no,
        //     username
        // });

        // Generate ticket numbers for each seat_no
        const formattedMatchId = match_id.toString() + "000";
        const tickets = seat_no.map(seat_no => {
            const formattedSeatNumber = seat_no.toString() + "000";
            const ticket_no = parseInt(`${formattedMatchId}${formattedSeatNumber}`);
            return {
                ticket_no,
                match_id,
                seat_no,
                username
            };
        });

        // Create all tickets in a single transaction
        await Ticket.bulkCreate(tickets);
        res.status(200).json({
            status: "success",
            ticket: tickets,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "fail",
            message: err,
        });
    }
}

// Delete a Ticket
const deleteTicket = async (req, res) => {
    try {
        // Check if ticket exists
        const is_exist = await Ticket.findOne({
            where: {
                ticket_no: req.params.ticket_no
            }
        });

        if (!is_exist) {
            res.status(404).json({
                status: "fail",
                message: "Ticket not found",
            });
            return;
        }

        await Ticket.destroy({
            where: {
                ticket_no: req.params.ticket_no
            }
        });
        res.status(200).json({
            status: "success",
            ticket: is_exist,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "fail",
            message: err,
        });
    }
}

const getTicketsByUsername = async (req, res) => {
    console.log("ana f getTicketsByUsername\n");
    try {
        // Merge tickets with match table
        const tickets = await Ticket.findAll({
            include: [
                {
                    model: Match,
                    as: 'match',
                    attributes: ['id', 'date'],
                    include: [
                        {
                            model: Stadium,
                            as: 'stadium',
                            attributes: ['id', 'name'],
                        },
                        {
                            model: Team,
                            as: 'hometeam',
                            attributes: ['id', 'name'],
                        },
                        {
                            model: Team,
                            as: 'awayteam',
                            attributes: ['id', 'name'],
                        }
                    ],
                },
            ],
            where: {
                username: req.params.username
            }
        });
        console.log(tickets);
        res.status(200).json({
            status: "success",
            tickets: tickets,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "fail",
            message: err,
        });
    }
}


export { getTicketsByMatchID, addTicket, deleteTicket, getTicketsByUsername };
