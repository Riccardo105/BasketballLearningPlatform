
const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema ({
    title: {type: String, required: true},
    category: {type: String, required: true},
    skillLevel: {type: String, required: true},
    body: {type: String, required: true}
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;