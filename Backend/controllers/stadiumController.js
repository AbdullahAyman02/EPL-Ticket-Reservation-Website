import { Stadium } from "../model/model.js";

const getStadiums = async (req, res) => {
    try {
        const stadiums = await Stadium.findAll({attributes:['id', 'name']});
        res.status(200).json({
            status: "success",            
            stadiums: stadiums,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "fail",
            message: err,
        });
    }
};

export { getStadiums };
