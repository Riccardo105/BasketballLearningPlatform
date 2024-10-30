const express = require("express");
const {userSignup, userLogin, userSignout} = require("../../controllers/api/userController");
const router = express.Router();

// routes
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/logout", userSignout);


module.exports = router;