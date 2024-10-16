const mongoose = require("mongoose")


// Ongoing session stores all the exercises/plan that have been started by the user.
// it retrieves the exercise/plan id and adds it to the session 
const ongoingSessionSchema = new mongoose.Schema ({
    title: {type: String, default: "Ongoing History"},
    userID:  [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    exercisesID: [{type: mongoose.Schema.Types.ObjectId, ref: "Exercise"}],
    positionPlanID:  [{type: mongoose.Schema.Types.ObjectId, ref: "PositionPlan"}],
    personalPlanID:  [{type: mongoose.Schema.Types.ObjectId, ref: "PersonalPlan"}]
});


// Ongoing session stores all the exercises/plan that have been completed by the user.
// once the user completes an exercise this is moved from ognoign to completed
const completedSessionSchema = new mongoose.Schema ({
    title: {type: String, default: "Completed History"},
    userID:  [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    exercisesID: [{type: mongoose.Schema.Types.ObjectId, ref: "Exercise"}],
    positionPlanID:  [{type: mongoose.Schema.Types.ObjectId, ref: "PositionPlan"}],
    personalPlanID:  [{type: mongoose.Schema.Types.ObjectId, ref: "PersonalPlan"}]
});

const OngoingSession = mongoose.model("Ongoing Session", ongoingSessionSchema);
const CompletedSession = mongoose.model("Completed Session", completedSessionSchema);

module.exports = {OngoingSession, CompletedSession};