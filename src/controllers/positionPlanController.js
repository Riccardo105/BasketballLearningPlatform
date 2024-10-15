const PositionPlan = require("../models/positionPlanModel");

// POST
// NOTE: this feature is not intended for the user.
// Thus it will not be implemented in front end.
// it will be accessible to devs/admin through API client (Postman)
const createPositionPlan = async (req, res) => {
    try {
        const {fieldPosition, exercisesIDs} = req.body;

        // Accessing fieldPosition enum:
        const allowedPositions = ["Point Guard", "Shooting Guard", "Center", "Power Forward", "Small Forward"];
        
        if (!allowedPositions.includes(fieldPosition)) {
            return res.status(400).json({
                message: `invalid field position. Allowed postions are: ${allowedPositions.join(",")}`
                });
        };
        
        if (!exercisesIDs || exercisesIDs.length == 0) {
            return res.status(404).json({message: "Plan must have at least on exercise."})
        };

        const newPositionPlan = new PositionPlan ({
            fieldPosition,
            exercisesIDs
        });

        await newPositionPlan.save();
        res.status(201).json(newPositionPlan)
    }
    catch (error) {
        return res.status(500).send({message: error.message});
    };        
}

// for the scope of this project only one plan per field position will be implemented
// Thus it is okay to query the plan via fieldPosition as there won't be any duplicates
const getPositionPlan = async (req, res) => {
    try {
        const plan = await PositionPlan.find({
            fieldPosition: req.body.fieldPosition
        })

        if (!plan) {
            return res.status(400).json({
                message: "no plan for this postion."
            });
        };

        return res.status(200).json(plan.map(plan => ({
            fieldPosition: plan.fieldPosition,
            exercisesIDs: plan.exercisesIDs
        })));
    }
    catch (error) {
        return res.status(500).send({message: error.message});
    }
}

module.exports = {createPositionPlan, getPositionPlan}