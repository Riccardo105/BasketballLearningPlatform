const { default: mongoose } = require("mongoose");
const mongoos = require("mongoose");

const exerciseSchema = new mongoose.Schema ({
    exerciseID: {type: Number, required: true},
    title: {type: String, required: true},
    category: {type: String, required: true},
    skillLevel: {type: String, required: true},
    body: {type: String, required: true}
});

const exercise = mongoose.model("Exercise", exerciseSchema);

model.exports = exercise;