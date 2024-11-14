const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const mongoose = require('mongoose');
const Exercise = require("../models/exerciseModel");
const authSessionToken = require("../config/auth");
const BlacklistedToken = require("../models/blackListedTokenModel");


// home page router STATIC
router.get("/home", (req, res) => {
    res.render("pages/home", { title: "home"})
});

// sign up page router STATIC
router.get("/signup", (req, res) => {
    res.render("pages/signup", { title: "signup"})
});

// login page router STATIC
router.get("/login", (req, res) => {
const token = req.cookies['token'];

    if (token) {
        // Verify the JWT token
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                console.error("Token verification failed:", err);
                // If verification fails, render the login page
                return res.render("pages/login", { title: "login" });
            }

            // Token is valid, redirect to dashboard
            return res.redirect("/dashboard");
        });
    } else {
        // No token found, render login page
        res.render("pages/login", { title: "login" });
    }
});


// exercises page router DINAMYC: fetch available exercises
// loads exercises to session storage for easy retrieval across different pages
router.get("/exercises", async (req, res) => {
    try {

        const exercisesList = await Exercise.find();
    
        res.render("pages/exercisesList", {
            title: "exercises",
            exercises: exercisesList, 
            extraScripts: true });
        
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

// exercise page router: DINAMYC  redirected to page from exercise list
// exercise list link sends exercise id to render the correct content
router.get("/exercise/:id", (req, res) => {
    const exerciseId = req.params.id;

    Exercise.findById(exerciseId)
        .then(exercise => {
            res.render("pages/exercise", {
                    title: `${exercise.title}`,
                    exercise
                });
            })
        .catch(error => {
            res.status(500).send('Error fetching exercise', error);
        });
});


// user dashboard route: DINAMIC redirected here if successfull login
// username is passed through URL
router.get("/dashboard", (req, res)=> {
    const token = req.cookies['token'];
    console.log(token)

    // Check if the token exists
    if (!token) {
        return res.redirect("/login"); // No token, redirect to login
    }

      // Verify the JWT token with a callback
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            console.error("Token verification failed:", err);
            return res.redirect("/login"); // Token verification failed, redirect to login
        }

        // Token is valid, check if it's blacklisted
        BlacklistedToken.findOne({ token }).then(blacklistedToken => {
            if (blacklistedToken) {
                return res.redirect("/login"); // Token is blacklisted
            }

            // Render the dashboard page with user information
            res.render("pages/dashboard", { title: `dashboard/${decoded.userName}`, userName: decoded.userName });
        }).catch(err => {
            console.error("Error checking blacklist:", err);
            return res.redirect("/login"); // Error occurred while checking blacklist
        });
    });
});



module.exports = router