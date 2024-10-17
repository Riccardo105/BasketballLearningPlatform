const mongoose = require("mongoose")

const personalPlaSchema = new mongoose.Schema({
    criteria: {type: [String], required: true},
    exercisesIDs: [{type: mongoose.Schema.Types.ObjectId, ref: "Exercise"}]
});

const PersonalPlan = mongoose.model("Personal Plan", personalPlaSchema);

module.exports = PersonalPlan;