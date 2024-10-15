const mongoose = require("mongoose")

const positionPlanSchema = new mongoose.Schema({
    fieldPosition: {type: String, required: true},
    exercisesIDs: [{type: mongoose.Schema.Types.ObjectId, ref: "Exercise"}]
});

const PositionPlan = mongoose.model("Postion Plan", positionPlanSchema);

module.exports = PositionPlan;