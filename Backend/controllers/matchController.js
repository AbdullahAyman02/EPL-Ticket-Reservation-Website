import { Match, Team, Stadium, Referee } from "../model/model.js";

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
    let match = await Match.create({
      home_team,
      away_team,
      stadium_id,
      date,
      referee_id,
      linesman_1,
      linesman_2,
    });
    res.status(201).json({
        status: "success",
        match: match,
    });
  } catch (err) {
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
    res.status(201).json({
        status: "success",
        match: match,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
}

export { addMatch, getMatches, getMatchById, editMatch };
