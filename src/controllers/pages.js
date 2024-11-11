const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Exercise = require("../models/exerciseModel");
const e = require("express");

// home page router STATIC
router.get("/home", (_req, res) => {
    res.render("pages/home", { title: "home"})
});

// sign up page router STATIC
router.get("/signup", (_req, res) => {
    res.render("pages/signup", { title: "signup"})
});

// login page router STATIC
router.get("/login", (_req, res) => {
    res.render("pages/login", { title: "login"})
});


// exercises page router DINAMYC: fetch available exercises 
router.get("/exercises", async (_req, res) => {
    try {

        const exercisesList = await Exercise.find();
    
        res.render("pages/exercises", {
            title: "exercises",
            exercises: exercisesList});
        
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});




module.exports = router