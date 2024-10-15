const express = require("express");
const {postExercise, getExerciseByCat} = require("../controllers/exerciseController");
const router = express.Router();

// routes
router.post("/createExercise", postExercise);
router.get("/getExerciseByCat", getExerciseByCat);

module.exports = router;