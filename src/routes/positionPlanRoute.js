const express = require("express");
const {createPositionPlan, getPositionPlan} = require("../controllers/positionPlanController");
const router = express.Router();

//routes
router.post("/createPositionPlan", createPositionPlan)
router.get("/getPositionPlan", getPositionPlan)


module.exports = router