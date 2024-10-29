const {OngoingSession, CompletedSession} = require("../models/sessionHistoryModel");
const Exercise = require("../models/exerciseModel");
const positionPlan = require("../models/positionPlanModel")


// Add entry to ognoing session
const addOngoingEntry = async (req, res) => {
    try {
        const {exerciseID = [], positionPlanID = []} = req.body;
        const userID = req.userId;
        
        // object hold the update operation based on ids in arrays
        const update = {};

        // if no value in array no operation is added to update object
        if (exerciseID.length > 0) {
            update.$push = { ...update.$push, exercisesID: exerciseID};
        };

        if (positionPlanID.length > 0) {
            update.$push = { ...update.$push, positionPlanID: positionPlanID};
        }
        
        // only run the update if there's a key in update
         if (Object.keys(update).length > 0){
            const result = await OngoingSession.updateOne(
                {userID},
                update,
                {returnDocument: "after"}
            );
            return res.status(200).send({ message: "update succesfull", result})
         } else {
            return res.status(200).send({message: "no changes made."})
         }
    }
    catch (error) {
        return res.status(500).send({message: error.message});
    };    
};

// get ongoing session

const getOngoingSession = async (req, res) => {
    try {
        const userID = req.userId;
         
        // find the user's ongoing session
        const ongoingSession = await OngoingSession.findOne ({userID})
         
        // retreive exercises/plans
        const exercisesID = ongoingSession.exercisesID;
        const exercises = await Exercise.find({_id: {$in: exercisesID}});
        const positionPlansID = ongoingSession.positionPlanID;
        const positionPlans = await positionPlan.find({_id: {$in: positionPlansID}});

        const response = {
            ongoingSession,
            exercises,
            positionPlans
        };

        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(500).send({message: error.message});

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
        const userID = req.userId;

        const completedSession = await CompletedSession.findOne ({userID})
        
         // retreive exercises/plans
         const exercisesID = completedSession.exercisesID;
         const exercises = await Exercise.find({_id: {$in: exercisesID}});
         const positionPlansID = completedSession.positionPlanID;
         const positionPlans = await positionPlan.find({_id: {$in: positionPlansID}});
 
         const response = {
             completedSession,
             exercises,
             positionPlans
         };
 
         return res.status(200).json(response)

    }
    catch (error) {
        return res.status(500).send({messge: error.message});

    };
};

module.exports = {addOngoingEntry, getOngoingSession, addCompletedEntry, getCompletedSession};