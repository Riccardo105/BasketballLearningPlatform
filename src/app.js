// Imports
require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session");
const jwt = require("jsonwebtoken");
const userRouter = require("./routes/userRoute");
const connectToDatabase = require ('./config/db');

// Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const authSessionToken = (req, res, next) => {
    const token = req.session.token;

    if (!token) {
        return res.statust(401).send({ message: "Unauthorised: Not token found."});
    }

    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
        if (err) {
            return res.status(500).send({message: "Unauthorised: Failed to authenticate"})
        }
        req.userId = decoded.id;
        next();
    });

};

// Cookie session setup
app.use (
    cookieSession({
        name: "Riccardo-session",
        key: process.env.COOKIE_KEY,
        httpOnly: true,
    })
);


// simple route to test server
app.get("/", (_req, res) => {
    res.send("Hello world");
});

connectToDatabase();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Log the server status
});

//routes
app.use("/users", userRouter);

module.exports = {authSessionToken};
