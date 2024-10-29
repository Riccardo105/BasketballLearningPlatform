const Exercise = require("../models/exerciseModel");

// POST
// NOTE: this feature is not intended for the user.
// Thus it will not be implemented in front end.
// it will be accessible to devs/admin through API client (Postman)

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
// exercises will be displayed as a list of titles
// but the entire document is retreived for easy access purposes
const getExerciseByCat  = async (req, res) => {
    try {
        const exercises = await Exercise.find({
        category: req.body.category
        });

        if (!exercises || exercises.length == 0) {
        return res.status(404).json({message: "No exercises for this category."})
        }
        
        return res.status(200).json(exercises.map(exercises => ({
            title: exercises.title,
            category: exercises.category,
            skillLevel: exercises.skillLevel,
            body: exercises.body,
            id: exercises.id
        })));
    }
    catch (error) {
        return res.status(500).send({message: error.message});
    }
};

// get exercise by skill level
// this is used as a filtering feature
const getExerciseBySkillLev  = async (req, res) => {
    try {
        const exercises = await Exercise.find({
        category: req.body.skillLevel
        });

        if (!exercises || exercises.length == 0) {
        return res.status(404).json({message: "No exercises for this skill level."})
        }
        
        return res.status(200).json(exercises.map(exercises => ({
            title: exercises.title,
            category: exercises.category,
            skillLevel: exercises.skillLevel,
            body: exercises.body,
            id: exercises.id
        })));
    }
    catch (error) {
        return res.status(500).send({message: error.message});
    }
};



// get exercise by ID
// this is used in pair with the positionPlan 
// where the exercises are stored by ID
// in this scenario this function will always receive an array of IDs
const getExerciseByID = async (req, res) => {
    try {
        const exerciseID = req.body;
        const exercises = await Exercise.findOne({exerciseID});

        return res.status(200).json({
            title: exercises.title,
            category: exercises.category,
            skillLevel: exercises.skillLevel,
            body: exercises.body,
            id: exercises.id
        });
    }
    catch (error) {
        return res.status(500).send({messge: error.message});

    };
};



module.exports = {postExercise, getExerciseByCat, getExerciseByID, getExerciseBySkillLev}