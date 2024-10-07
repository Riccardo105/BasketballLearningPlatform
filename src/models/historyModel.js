const mongoose = require("mongoose")

const historySchema = new mongoose.Schema({
    referenceType: {type: String, required: true, enum:["Exercise", "Personal Plan", "Position Plan"]},
    refernceID: {type: mongoose.Schemama.Types.ObjectId, required: true},
    status: {type: String, required: true},
    completionDate: {type: Date, required: true}
});

const history = mongoose.model("History", historySchema);

model.exports = history;