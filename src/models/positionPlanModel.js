const mongoose = require("mongoose")

const positionPlanSchema = new mongoose.Schema({
    fieldPosition: {type: String, required: true, enum:["Point Guard", "Shooting Guard", "Center", "Power Forward", "Small Forward"]},
    exercisesIDs: [{type: mongoose.Schema.Types.ObjectId, ref: "Exercise"}]
});

const PositionPlan = mongoose.model("Postion Plan", positionPlanSchema);

module.exports = PositionPlan;