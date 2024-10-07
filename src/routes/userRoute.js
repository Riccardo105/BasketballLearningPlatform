const express = require("express");
const {createUser} = require("../controllers/userController");
const router = express.Router();

// POST route
router.post("/create", createUser);


module.exports = router;