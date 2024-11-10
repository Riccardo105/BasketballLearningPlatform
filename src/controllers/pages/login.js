const express = require("express");
const router = express.Router();

router.get("/", (_req, res) => {
    res.render("pages/login", { title: "login"})
});

module.exports = router