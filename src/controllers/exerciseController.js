const Exercise = require("../models/exerciseModel");

// POST
// NOTE: this feature is not intended for the user.
// Thus it will not be implemented in front end.
// it will be accessible to devs/admin through API client

const postExercise = async (req, res) => {
    try {
        const {title, category, skillLevel, body} = req.body;

        if (!title || !category || !skillLevel || !body) {
            return res.status(400).json({message: "All fields requried"});

        };
        const newExercise = new Exercise({
            title,
            category,
            skillLevel,
            body
        });

        await newExercise.save();
        
        res.status(201).json(newExercise)
    }   
    catch (error) {
        return res.status(500).send({message: error.message});
    };        
};


// get Exercise list by category
// exercises will be displayed as a lsit of titles
// but the entire document is retreived for easy access purposes
const getExercise  = async (req, res) => {
    try {
        const exercises = await Exercise.findAll({
        category: req.body.category
        });

        if (!exercises) {
        return res.status(404).send({message: "No exercises for this category."})
        }
        
        return res.status(200)({
            title: exercises.title,
            category: exercises.category,
            skillLevel: exercises.skillLevel,
            body: exercises.body
        });
    }
    catch (error) {
        return res.status(500).send({message: error.message});
    }
};

module.exports = {postExercise, getExercise}