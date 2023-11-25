import { Match } from "../model/model.js";

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

const getMatch = async (req, res) => {
  try {
    const match = await Match.findAll();
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

export { addMatch, getMatch, editMatch };
