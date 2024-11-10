const express = require("express");
const router = express.Router();

router.get("/", (_req, res) => {
    res.render("pages/signup", { title: "signup"})
});

module.exports = router