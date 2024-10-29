const express = require("express");
const {createPositionPlan, getPositionPlan} = require("../../controllers/api/positionPlanController");
const router = express.Router();

//routes
router.post("/createPositionPlan", createPositionPlan)
router.get("/getPositionPlan", getPositionPlan)


module.exports = router