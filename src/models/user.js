const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    userID: {type: Number, require: true},
    istoryID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'History'}]
});

const User = mongoose.model("User", userSchema);

module.exports = User;