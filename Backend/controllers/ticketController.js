import { parse } from "dotenv";
import { Ticket } from "../model/model.js";
import { Match } from "../model/model.js";
import { Stadium } from "../model/model.js";
import { Team } from "../model/model.js";
import { Op } from "sequelize";

const getTicketsByMatchID = async (req, res) => {
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
            },
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
        console.log(match)
        const match_date = new Date(match.date).toISOString().slice(0, 16);
        const today = new Date();
        const today_date = today.toISOString().slice(0, 16);
        console.log(match_date);
        console.log(today_date);
        if (match_date < today_date) {
            res.status(409).json({
                status: "fail",
                message: "Match already played",
            });
            return;
        }

        console.log(match);
        // Check if match time clashes with other matches that this user bought tickets for
        const clashing_tickets = await Ticket.findAll({
            where: {
              username: username,
              match_id: {
                [Op.not]: match_id, // Exclude the current match
                },
            },
            include:
            [
                {
                    model: Match,
                    as: 'match',
                    attributes: ['id', 'date'],
                    where: {
                        date: {
                        [Op.between]: [
                            new Date(new Date(match_date).getTime() - 2 * 60 * 60 * 1000),
                            new Date(new Date(match_date).getTime() + 2 * 60 * 60 * 1000),
                            ],
                        },
                    },
                },
            ],
          });

        if (clashing_tickets.length > 0) {
            return res.status(409).json({
                status: "fail",
                message: "You already have a ticket for a match that clashes with this match",
            });
        }

        for(let i = 0; i < seat_no.length; i++) {
            // Check that the ticket is not already bought
            const is_exist = await Ticket.findOne({
                where: {
                    match_id: match_id,
                    seat_no: seat_no[i],
                }
            });
    
            if (is_exist) {
                return res.status(409).json({
                    status: "fail",
                    message: "Ticket(s) already bought",
                });
            }
        }

        // Generate ticket numbers for each seat_no
        const formattedMatchId = match_id.toString() + "00";
        const tickets = seat_no.map((seat_no) => {
            const formattedSeatNumber = seat_no.toString() + "00";
            const ticket_no = parseInt(`${formattedMatchId}${formattedSeatNumber}`);
            
            return {
                ticket_no,
                match_id,
                seat_no,
                username
            };
        });

        if(res.statusCode === 409) return;
        console.log(tickets);

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
                username: req.params.username,
                // the ticket is for a match that has not been played yet
                [Op.and]: [
                    { '$match.date$': { [Op.gte]: new Date() } },
                ],
            },
            // sort the tickets according to the match date
            order: [
                [{ model: Match, as: 'match' }, 'date', 'ASC'],
            ],
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
