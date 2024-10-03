const mongoose = require("mongoose")

const positionPlanSchema = new mongoose.Schema({
    postionPlanID: {type: Number, required: true},
    fieldPosition: {type: String, required: true},
    exercisesIDs: [{type: mongoose.Schema.Types.ObjectId, ref: "exercise"}]
});

const positionPlan = mongoose.model("Postion Plan", positionPlanSchema);

module.exports = positionPlan;