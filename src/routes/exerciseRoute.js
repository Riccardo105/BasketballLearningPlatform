const express = require("express");
const {postExercise, getExercise} = require("../controllers/exerciseController");
const router = express.Router();

// routes
router.post("/createExercise", postExercise);
router.get("/getExercise", getExercise);

module.exports = router;