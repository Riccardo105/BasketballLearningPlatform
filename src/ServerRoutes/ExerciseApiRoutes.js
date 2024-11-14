const express = require("express");
const {postExercise, getExerciseByCat, getExerciseByID, getExerciseBySkillLev} = require("../ServerControllers/api/ExerciseApiController");

const router = express.Router();

// API
router.post("/createExercise", postExercise);
router.get("/getByCat", getExerciseByCat);
router.get("/getByID", getExerciseByID);
router.get("getbBySkillLev", getExerciseBySkillLev);

// Pages



module.exports = router;

