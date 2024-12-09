const mongoose = require("mongoose");
const Exercise = require("../../models/exerciseModel");
const { response } = require("express");


// exercises page controller: fetch available exercises
const exercisesPage = async (req, res) => {
    try {

        const exercisesList = await Exercise.find();
    
        res.render("pages/exercisesList", {
            title: "exercises",
            exercises: exercisesList, 
            extraScripts: true,
            exercisesJSON: JSON.stringify(exercisesList)});
        
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
};



// exercise page Controller: redirected to page from exercise list
// exercise list link sends exercise id to render the correct content
const exercisePage = (req, res) => {
    const isToken = !!req.cookies["token"] 
    let result;
    if (isToken) {
        result = true 
    } else {
         result = false
    }
            res.render("pages/exercise", {
                    title: "exercise",
                    showCompleteBtn: result,
                });
      
};


module.exports = {exercisesPage, exercisePage}