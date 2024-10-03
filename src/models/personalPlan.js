const mongoose = require("mongoose")

const personalPlaSchema = new mongoose.Schema({
    personalPlanSchemaID: {type: Number, required: true},
    criteria: {type: [String], required: true},
    exercisesIDs: [{type: mongoose.Schema.Types.ObjectId, ref: "exercise"}]
});

const personalPlan = mongoose.model("Personal Plan", personalPlaSchema);

model.exports = personalPlan;