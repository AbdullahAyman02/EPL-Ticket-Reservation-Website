import { Match, Team, Stadium, Referee, Ticket, User } from "../model/model.js";
import { SendEmail } from '../controllers/userController.js'
import { Op } from 'sequelize';

const getEmails = async (usernames) => {
  const emails = await User.findAll({
    attributes: ['username', 'email'],
    // check if username is in the array
    where: {
      username: {
        [Op.in]: usernames
      }
    }  
  });
  return emails
};

const getReservedTickets = async (matchId) => {
  const tickets = await Ticket.findAll({
      attributes: ['seat_no', 'username', 'ticket_no'],
      where: { match_id: matchId }
  });

  return tickets
};

const addMatch = async (req, res) => {
  const {
    home_team,
    away_team,
    stadium_id,
    date,
    referee_id,
    linesman_1,
    linesman_2,
  } = req.body;
  
  try{
    // Home team and away team must be different
    if (home_team === away_team) {
      return res.status(400).json({
        status: "fail",
        message: "Home team and away team must be different",
      });
    }
    // Must be 3 different referees
    if (referee_id === linesman_1 || referee_id === linesman_2 || linesman_1 === linesman_2) {
      return res.status(400).json({
        status: "fail",
        message: "Must be 3 different referees",
      });
    }
    // Date must be in the future by one day
    const today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    // set time to 00:00:00
    tomorrow.setUTCHours(0,0,0,0);
    tomorrow = tomorrow.toISOString().slice(0, 16);
    if (date < tomorrow) {
      return res.status(400).json({
        status: "fail",
        message: "Date must be tomorrow or later",
      });
    }

    //Check if stadium is occupied by another match in the same day
    let startOfDay = new Date(date+"Z");
    startOfDay.setUTCHours(0, 0, 0, 0);
    console.log(startOfDay)
    let endOfDay = new Date(date+"Z");
    endOfDay.setUTCHours(23, 59, 59, 999);
    console.log(endOfDay)
    console.log(date)

    const same_match = await Match.findOne({
        where: {
          date: {
            [Op.between]: [startOfDay, endOfDay]
          },
          [Op.or]: [
            { stadium_id: stadium_id },
            { home_team: home_team },
            { away_team: home_team },
            { home_team: away_team },
            { away_team: away_team },
            { referee_id: referee_id },
            { referee_id: linesman_1 },
            { referee_id: linesman_2 },
            { linesman_1: referee_id },
            { linesman_1: linesman_1 },
            { linesman_1: linesman_2 },
            { linesman_2: referee_id },
            { linesman_2: linesman_1 },
            { linesman_2: linesman_2 }
          ]
        }
    });

    console.log("Same match ",same_match)
    if (same_match) {
      if ([home_team, away_team].some(element => [same_match.home_team, same_match.away_team].includes(parseInt(element, 10)))) {
        return res.status(400).json({
          status: "fail",
          message: "One of the teams is playing on the same day",
        });
      } else if([linesman_1, linesman_2, referee_id].some(element => [same_match.referee_id, same_match.linesman_1, same_match.linesman_2].includes(parseInt(element, 10)))){
        return res.status(400).json({
          status: "fail",
          message: "One of the referees is occupied by another match in the same day",
        });
      } else {
        return res.status(400).json({
          status: "fail",
          message: "Stadium is occupied by another match in the same day",
        });
      } 
    }

    let match = await Match.create({
      home_team,
      away_team,
      stadium_id,
      date,
      referee_id,
      linesman_1,
      linesman_2,
    });
    res.status(200).json({
        status: "success",
        match: match,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

const getMatches = async (req, res) => {
  try {
    const match = await Match.findAll({
      attributes: ['id', 'hometeam.name', 'awayteam.name', 'stadium.name', 'date', 'referee.name', 'linesman1.name', 'linesman2.name'],
      include: [
        {
          model: Team,
          as: 'hometeam',
          attributes: ['id', 'name'],
        },
        {
          model: Team,
          as: 'awayteam',
          attributes: ['id', 'name'],
        },
        {
          model: Stadium,
          as: 'stadium',
          attributes: ['id', 'name'],
        },
        {
          model: Referee,
          as: 'referee',
          attributes: ['id', 'name'],
        },
        {
          model: Referee,
          as: 'linesman1',
          attributes: ['id', 'name'],
        },
        {
          model: Referee,
          as: 'linesman2',
          attributes: ['id', 'name'],
        },
      ],
      where: {
        date: {
          [Op.gte]: new Date(),
        }
      },
      // sort the matches by date
      order: [
        ['date', 'ASC'],
      ],
    });
    res.status(200).json({
      status: "success",
      match: match,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
}

const getMatchById = async (req, res) => {
    const id = req.params.id;
    try {
        const match = await Match.findOne({
          attributes: ['id', 'date'],
          include: [
            {
              model: Team,
              as: 'hometeam',
              attributes: ['id'],
            },
            {
              model: Team,
              as: 'awayteam',
              attributes: ['id'],
            },
            {
              model: Stadium,
              as: 'stadium',
              attributes: ['id', 'name', 'no_of_rows', 'seats_per_row'],
            },
            {
              model: Referee,
              as: 'referee',
              attributes: ['id', 'name'],
            },
            {
              model: Referee,
              as: 'linesman1',
              attributes: ['id', 'name'],
            },
            {
              model: Referee,
              as: 'linesman2',
              attributes: ['id', 'name'],
            },
          ],
          where: {
            id: id,
          },
        });
        res.status(200).json({
        status: "success",
        match: match,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
        status: "fail",
        message: err,
        });
    }
};


const editMatch = async (req, res) => {
  const {
    id,
    home_team,
    away_team,
    stadium_id,
    date,
    referee_id,
    linesman_1,
    linesman_2,
  } = req.body;
  
  try{
    // Home team and away team must be different
    if (home_team === away_team) {
      return res.status(400).json({
        status: "fail",
        message: "Home team and away team must be different",
      });
    }
    // Must be 3 different referees
    if (referee_id === linesman_1 || referee_id === linesman_2 || linesman_1 === linesman_2) {
      return res.status(400).json({
        status: "fail",
        message: "Must be 3 different referees",
      });
    }
    // Date must be in the future by one day
    const today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    // set time to 00:00:00
    tomorrow.setUTCHours(0,0,0,0);
    tomorrow = tomorrow.toISOString().slice(0, 16);

    if (date < tomorrow) {
      return res.status(400).json({
        status: "fail",
        message: "Date must be in the future",
      });
    }

    // Check if stadium is changed
    const oldMatch = await Match.findByPk(id);
    if (oldMatch.stadium_id !== stadium_id) {
      console.log("Stadium changed");
        // Check if the seat numbers in the old stadium exist in the new stadium
        const reservedTickets = await getReservedTickets(id);
        const reservedSeats = reservedTickets.map(ticket => ticket.seat_no);
        const newStadium = await Stadium.findByPk(stadium_id);
        for (let seatNo of reservedSeats) {
          if (seatNo > newStadium.no_of_rows * newStadium.seats_per_row) {
            return res.status(400).json({
              status: "fail",
              message: "The new stadium is smaller than the old stadiums, some already reserved seats do not exist in the new stadium",
            });
          }
        }
        console.log("All seats exist in the new stadium");
        // Send email to users who bought tickets for this match
        const users_temp = reservedTickets.map(ticket => ticket.username);
        const users = await getEmails(users_temp);
        for (let user of users) {
          // Send email to user
          req.body.email = user.email;
          console.log(req.body.email)
          // Change date to string
          const temp_date = date.split(".")[0].replace("T", " ");
          console.log(temp_date);
          const temp_ticket = reservedTickets.find(ticket => ticket.username === user.username).ticket_no;
          // Email content
          let string = `Hi! There, ${user.username}! \n\n`
          string += `The match you bought tickets for has been moved to a new stadium. \n\n`
          string += `The match date is ${temp_date}. \n\n`
          string += `The new stadium is ${newStadium.name}. \n\n`
          string += `The ticket number is the same, ${temp_ticket}. \n\n`
          string += `Your seat number is the same. But its position may have changed, check the lounge again.\n\n`
          string += `Thank you for using our service. \n\n`
          req.body.text = string;
          console.log(req.body.text);
          await SendEmail(req, res, 3);
          console.log("Sending email to " + user);
        }
    }

    //Check if stadium is occupied by another match in the same day
    let startOfDay = new Date(date+"Z");
    startOfDay.setUTCHours(0, 0, 0, 0);
    console.log(startOfDay)
    let endOfDay = new Date(date+"Z");
    endOfDay.setUTCHours(23, 59, 59, 999);
    console.log(endOfDay)
    console.log(date)

    const same_match = await Match.findOne({
      where: {
        date: {
          [Op.between]: [startOfDay, endOfDay]
        },
        [Op.or]: [
          { stadium_id: stadium_id },
          { home_team: home_team },
          { away_team: home_team },
          { home_team: away_team },
          { away_team: away_team },
          { referee_id: referee_id },
          { referee_id: linesman_1 },
          { referee_id: linesman_2 },
          { linesman_1: referee_id },
          { linesman_1: linesman_1 },
          { linesman_1: linesman_2 },
          { linesman_2: referee_id },
          { linesman_2: linesman_1 },
          { linesman_2: linesman_2 }
        ],
        id: {
          [Op.ne]: id
        }
      }
    });
    if (same_match) {
      if ([home_team, away_team].some(element => [same_match.home_team, same_match.away_team].includes(parseInt(element, 10)))) {
        return res.status(400).json({
          status: "fail",
          message: "One of the teams is playing on the same day",
        });
      } else if([linesman_1, linesman_2, referee_id].some(element => [same_match.referee_id, same_match.linesman_1, same_match.linesman_2].includes(parseInt(element, 10)))){
        return res.status(400).json({
          status: "fail",
          message: "One of the referees is occupied by another match in the same day",
        });
      } else {
        return res.status(400).json({
          status: "fail",
          message: "Stadium is occupied by another match in the same day",
        });
      } 
    }
    
    let match = await Match.update({
      home_team,
      away_team,
      stadium_id,
      date,
      referee_id,
      linesman_1,
      linesman_2,
    }, {
        where: {
        id: id,
      }
    });

    res.status(200).json({
        status: "success",
        match: match,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
}

export { addMatch, getMatches, getMatchById, editMatch };
