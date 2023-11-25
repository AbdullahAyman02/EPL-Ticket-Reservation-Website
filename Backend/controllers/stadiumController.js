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

const addStadium = async (req, res) => {
    const {
        name,
        no_of_rows,
        seats_per_row
    } = req.body;
    
    try{
        let stadium = await Stadium.create({
            name,
            no_of_rows,
            seats_per_row
        });
        res.status(201).json({
            status: "success",
            stadium: stadium,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "fail",
            message: err,
        });
    }
}

export { getStadiums, addStadium };
