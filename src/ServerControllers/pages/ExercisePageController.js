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
            extraScripts: true });
        
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
};



// exercise page Controller: redirected to page from exercise list
// exercise list link sends exercise id to render the correct content
const exercisePage = (req, res) => {
    const exerciseId = req.params.id;
    
    const isToken = !!req.cookies["token"]
    const token = req.cookies["token"]
    
    
    if (isToken){
        fetch("http://localhost:5000/sessionHistory/addOngoingEntry", {
            method: 'POST',
            body: JSON.stringify({ exerciseId, token}),
            headers: { 'Content-Type': 'application/json' },
            credentials: "include"
        }).then(response => {
            if (!response.ok) {
                // If the response status is not OK (200), log the status and throw an error
                console.error('Error: ', response.status, response.statusText);
                
            }
            return response.json();

        }).catch(error => {
            console.error('Error calling the add-entry API:', error);
        });
    }

    Exercise.findById(exerciseId)
        .then(exercise => {
            res.render("pages/exercise", {
                    title: `${exercise.title}`,
                    exercise
                });
            })
        .catch(error => {
            res.status(500).send('Error fetching exercise', error);
        });
};


module.exports = {exercisesPage, exercisePage}