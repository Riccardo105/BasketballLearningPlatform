const express = require("express");
const router = express.Router();
const {addOngoingEntry, getOngoingSession, addCompletedEntry, getCompletedSession} = require("../controllers/api/sessionHistoryController");
const authToken = require("../../config/auth")

//routes

router.post("/addOngoingEntry", authToken, addOngoingEntry);
router.get("/getOngoingSession", authToken, getOngoingSession);
router.post("/addCompletedEntry", authToken, addCompletedEntry);
router.get("/getCompletedSession", authToken, getCompletedSession);

module.exports = router