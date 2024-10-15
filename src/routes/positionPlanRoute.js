const express = require("express");
const {createPositionPlan} = require("../controllers/positionPlanController");
const router = express.Router();

//routes
router.post("/createPositionPla", createPositionPlan)


module.exports = router