const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    historyID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'History'}]
});

const User = mongoose.model("User", userSchema);

module.exports = User;