const express = require("express");
const {createUser, retreiveUser} = require("../controllers/userController");
const router = express.Router();

// routes
router.post("/create", createUser);
router.get("/retreive", retreiveUser);


module.exports = router;