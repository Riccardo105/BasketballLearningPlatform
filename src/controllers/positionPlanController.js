const PositionPlan = require("..models/positionPlanModel");

// POST
// NOTE: this feature is not intended for the user.
// Thus it will not be implemented in front end.
// it will be accessible to devs/admin through API client (Postman)
const createPositionPlan = async (req, res) => {
    try {
        const {fieldPostion, exercisesIDs} = req.body

        // Accessing fieldPosition enum:
        const allowedPosition = PositionPlan.schema.path("fieldPosition").enumValues;
        
        if (!allowedPosition.includes(fieldPostion)) {
            return res.status(400).json({
                message: `invalid field position. Allowed postions are: ${allowedPositions.join(",")}`
                });
        };
        
        if (!exercisesIDs || exercisesIDs.length == 0) {
            return res.status(404).json({message: "Plan must have at least on exercise."})
        };

        const newPostionPlan = new PositionPlan ({
            fieldPostion,
            exercisesIDs
        });

        await newPostionPlan.save();
        res.status(201).json(newPositionPlan)
    }
    catch (error) {
        return res.status(500).send({message: error.message});
    };        
}

module.exports = {createPositionPlan}