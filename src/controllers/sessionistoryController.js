const OngoingSession = require("../models/sessionHistoryModel");
const CompletedSession = require("../models/sessionHistoryModel");

// Add entry to ognoing session
const addOngoingEntry = async (req, res) => {
    try {
        const {exerciseID = [], personalPlanID = [], positionPlanID = []} = req.body;
        const userID = req.userId;

        const ongoingSession = await OngoingSession.findOne ({userID});

        // adds the available id to the document
        // if the array is empty the statement will have no effect
        ongoingSession.exerciseID.push(...exerciseID);
        ongoingSession.personalPlanID.push(...personalPlanID);
        ongoingSession.positionPlanID.push(...positionPlanID);

        await ongoingSession.save();
    }
    catch (error) {
        return res.status(500).send({message: error.message});
    };    
};

// get ongoing session

const getOngoingSession = async (req, res) => {
    try {
        const userID = req.userId;
        
        // .populate is built-in mongose method which retrieves the entire documents 
        // based on the foreign keys 
        const ongoingSession = await OngoingSession.findOne ({userID})
            .populate("exercisesID")
            .populate("personalPlandID")
            .populate("positionPlanID");

            return res.status(200).json(ongoingSession);

    }
    catch (error) {
        return res.status(500).send({messge: error.message});

    };
};

module.exports = {addOngoingEntry, getOngoingSession};