const express = require("express");
const router = express.Router();

router.get("/", (_req, res) => {
    res.render("pages/home", { title: "home"})
});

module.exports = router