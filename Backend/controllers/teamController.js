import { Team } from "../model/model.js";

const getTeams = async (req, res) => {
    try {
        const teams = await Team.findAll({attributes:['id', 'name']});
        res.status(200).json({
            status: "success",            
            teams: teams,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "fail",
            message: err,
        });
    }
}

export { getTeams };