const mongoose = require("mongoose")

const historySchema = new mongoose.Schema({
    referenceType: {type: String, required: true, enum:["Exercise", "Personal Plan", "Position Plan"]},
    refernceID: {type: mongoose.Schemama.Types.ObjectId, required: true},
    userID: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    status: {type: String, required: true},
    completionDate: {type: Date}
});

const history = mongoose.model("History", historySchema);

module.exports = history;