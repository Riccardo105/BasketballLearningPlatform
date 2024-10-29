const express = require("express");
const {postExercise, getExerciseByCat, getExerciseByID, getExerciseBySkillLev} = require("../controllers/api/exerciseController");
const router = express.Router();

// routes
router.post("/createExercise", postExercise);
router.get("/getByCat", getExerciseByCat);
router.get("/getByID", getExerciseByID);
router.get("getbBySkillLev", getExerciseBySkillLev);


module.exports = router;