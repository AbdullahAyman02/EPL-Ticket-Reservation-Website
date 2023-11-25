import { Referee } from "../model/model.js";

const getReferees = async (req, res) => {
    try {
        const referees = await Referee.findAll({attributes:['id', 'name']});
        res.status(200).json({
            status: "success",            
            referees: referees,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "fail",
            message: err,
        });
    }
}

export { getReferees };