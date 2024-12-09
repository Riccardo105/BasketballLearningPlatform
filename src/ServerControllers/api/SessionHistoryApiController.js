const {OngoingSession, CompletedSession} = require("../../models/sessionHistoryModel");
const Exercise = require("../../models/exerciseModel");
const mongoose = require("mongoose")
const { Types } = require('mongoose');
const User = require("../../models/userModel");


// Add entry to ognoing session
const addOngoingEntry = async (req, res) => {
    try {
        const { exerciseId } = req.body;  
        console.log("form addOngoing:", exerciseId)
        const userID = req.userId;
        
        // Check if the exercise already exists in the completed session
        const completedSession = await CompletedSession.findOne({
            userID: userID,
            exercisesID: exerciseId,
        });

        if (completedSession) {
            console.log("Exercise already exists in the completed session.");
            return res
                .status(400)
                .send({ message: "Exercise already completed, cannot add to ongoing session." });
        }
        
        // Only update if exerciseID is provided
        if (exerciseId) {
            const update = { $addToSet: { exercisesID: exerciseId } };
            
            // Proceed with update
            const result = await OngoingSession.updateOne({ userID: userID }, update);
            
            if (result.modifiedCount > 0) {
                console.log("Document updated successfully");
                return res.status(200).send({ message: "Update successful" });
            } else {
                console.log("No document was updated");
                return res.status(400).send({ message: "No matching document found to update." });
            }
        } else {
            return res.status(200).send({ message: "No exercise ID provided." });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

// delete entry from the ongoing session when it is moved to the completed session
const removeOngoingEntry = async (req, res) => {
    try {
        const { exerciseId } = req.body;  
        const userID = req.userId;
        
        console.log("remove entry:", userID)
        
        // Only update if exerciseID is provided
        if (exerciseId) {
            const update = { $pull: { exercisesID: exerciseId } };
            

            // Proceed with update
            const result = await OngoingSession.updateOne({ userID: userID }, update);
            
            if (result.modifiedCount > 0) {
                console.log("Document updated successfully");
                return res.status(200).send({ message: "Update successful" });
            } else {
                console.log("No document was updated");
                return res.status(400).send({ message: "No matching document found to update." });
            }
        } else {
            return res.status(200).send({ message: "No exercise ID provided." });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

// get ongoing session

const getOngoingSession = async (req, res) => {
    try {
        
        const userID = new mongoose.Types.ObjectId(req.body.userId);

        const ongoingSession = await OngoingSession.findOne({
        userID: userID
        });
         
        // retreive exercises/plans
        const exercisesID = ongoingSession.exercisesID || [];
        
        // If there are no exercises, return an empty array for exercises
        if (exercisesID.length === 0) {
            return { ongoingSession, ongoingExercises: [] };
        }

        // Query the exercises collection based on the exercise IDs
        const ongoingExercises = await Exercise.find({
            _id: { $in: exercisesID }
        });


        // Return the completed session and exercises data
        return { ongoingSession, ongoingExercises };
    }
    catch (error) {
        console.error("Error in getOngoingSession:", error);
        throw new Error("Failed to retrieve ongoing session");

    };
};

// same logic as above but the entry is also removed from the ongoing session 
const addCompletedEntry = async (req, res) => {
    try {
        const { exerciseId } = req.body;  
        const userID = req.userId;
        
        
        // Only update if exerciseID is provided
        if (exerciseId) {
            const update = { $addToSet: { exercisesID: exerciseId } };
            

            // Proceed with update
            const result = await CompletedSession.updateOne({ userID: userID }, update);
            
            if (result.modifiedCount > 0) {
                console.log("Document updated successfully");
                return res.status(200).send({ message: "Update successful" });
            } else {
                console.log("No document was updated");
                return res.status(400).send({ message: "No matching document found to update." });
            }
        } else {
            return res.status(200).send({ message: "No exercise ID provided." });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
    
   

const getCompletedSession = async (req, res) => {
    try {

        const userID = new mongoose.Types.ObjectId(req.body.userId);
        

        const completedSession = await CompletedSession.findOne({
        userID: userID
        });
        
         // retreive exercises
         const exercisesID = completedSession.exercisesID || [];
         
 
        // If there are no exercises, return an empty array for exercises
        if (exercisesID.length === 0) {
            return { completedSession, completedExercises: [] };
        }

        // Query the exercises collection based on the exercise IDs
        const completedExercises = await Exercise.find({
            _id: { $in: exercisesID }
        });

        // Return the completed session and exercises data
        return { completedSession, completedExercises };

    }
    catch (error) {
        console.error("Error in getOngoingSession:", error);
        throw new Error("Failed to retrieve completed session");

    };
};

module.exports = {addOngoingEntry, removeOngoingEntry, getOngoingSession, addCompletedEntry, getCompletedSession};