const express = require("express");
const {userSignup, userLogin, userSignout, updateCredentials} = require("../ServerControllers/api/UserApiController");
const router = express.Router();

// routes
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/logout", userSignout);
router.post("updateCred", updateCredentials);


module.exports = router;