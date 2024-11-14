const express = require("express");
const router = express.Router();
const {addOngoingEntry, getOngoingSession, addCompletedEntry, getCompletedSession} = require("../ServerControllers/api/SessionHistoryApiController");
const authSessionToken = require("../config/auth")

//routes

router.post("/addOngoingEntry", authSessionToken, addOngoingEntry);
router.get("/getOngoingSession", authSessionToken, getOngoingSession);
router.post("/addCompletedEntry", authSessionToken, addCompletedEntry);
router.get("/getCompletedSession", authSessionToken, getCompletedSession);

module.exports = router