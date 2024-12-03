const express = require("express");

const {exercisesPage, exercisePage} = require("../ServerControllers/pages/ExercisePageController");
const loginPage = require("../ServerControllers/pages/LoginPageController");
const dashboardPage = require("../ServerControllers/pages/DashBoardPageController");

const router = express.Router();

router.get("/exercises", exercisesPage);
router.get("/exercise/:id", exercisePage);

router.get("/login", loginPage);
router.get("/dashboard", dashboardPage);


// home page router STATIC
router.get("/home", (req, res) => {
    res.render("pages/home", { title: "home"})
});

// sign up page router STATIC
router.get("/signup", (req, res) => {
    res.render("pages/signup", { title: "signup"})
});

// offline page router STATIC

router.get("/offline", (req, res) => {
    res.render("pages/offline", { title: "offline"})
});


module.exports = router