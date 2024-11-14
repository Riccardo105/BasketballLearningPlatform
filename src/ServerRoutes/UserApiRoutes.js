const express = require("express");
const {userSignup, userLogin, userSignout} = require("../ServerControllers/api/UserApiController");
const router = express.Router();

// routes
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/logout", userSignout);


module.exports = router;