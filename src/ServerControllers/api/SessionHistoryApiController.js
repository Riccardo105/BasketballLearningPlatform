const {OngoingSession, CompletedSession} = require("../../models/sessionHistoryModel");
const Exercise = require("../../models/exerciseModel");
const mongoose = require("mongoose")
const { Types } = require('mongoose');
const User = require("../../models/userModel");


// Add entry to ognoing session
const addOngoingEntry = async (req, res) => {
    try {
        const { exerciseId } = req.body;  
        const userID = req.userId;
        
        
        // Only update if exerciseID is provided
        if (exerciseId) {
            const update = { $addToSet: { exercisesID: exerciseId } };
            

            // Proceed with update
            const result = await OngoingSession.updateOne({ userID: userID }, update);
            
            if (result.nModified > 0) {
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
        console.log('Converted userID:', userID);
        console.log(userID instanceof Types.ObjectId)


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
        const {exerciseID = [], positionPlanID = []} = req.body;
        const userID = req.userId;
        
        // object hold the update operation based on ids in arrays
        const updateCompleted = {};
        const updateOngoing = {};

        // if no value in array no operation is added to update object
        if (exerciseID.length > 0) {
            updateOngoing.$pull = { ...updateOngoing.$pull, exercisesID: exerciseID};
            updateCompleted.$push = { ...updateCompleted.$push, exercisesID: exerciseID};
        };

        if (positionPlanID.length > 0) {
            updateOngoing.$pull = { ...updateOngoing.$pull, positionPlanID: positionPlanID};
            updateCompleted.$push = { ...updateCompleted.$push, positionPlanID: positionPlanID};
        };
     
        console.log(updateOngoing);
        console.log(updateCompleted);

        // only run the update if there's a key in update
         if (Object.keys(updateOngoing).length > 0 && Object.keys(updateCompleted).length > 0){
            const resultOngoing = await OngoingSession.findOneAndUpdate(
                {userID},
                updateOngoing,
                {returnDocument: "after"}
            );
            const resultCompleted = await CompletedSession.findOneAndUpdate(
                {userID},
                updateCompleted,
                {returnDocument: "after"}  
            );
            return res.status(200).send({ message: "update succesfull", resultOngoing: resultOngoing, resultCompleted: resultCompleted})
         } else {
            return res.status(200).send({message: "no changes made."})
         };
    }
    catch (error) {
        return res.status(500).send({message: error.message});
    };    
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
            return { completedSession, CompletedExercises: [] };
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

module.exports = {addOngoingEntry, getOngoingSession, addCompletedEntry, getCompletedSession};