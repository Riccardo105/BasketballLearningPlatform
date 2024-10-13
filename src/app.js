// Imports
require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session");
const jwt = require("jsonwebtoken");
const userRouter = require("./routes/userRoute");
const connectToDatabase = require ('./config/db');
const cookieKey = process.env.COOKIE_KEY

// Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());



// Cookie session setup
app.use (
    cookieSession({
        name: "Riccardo-session",
        keys: [cookieKey],
        httpOnly: true,
    })
);


// simple route to test server
app.get("/", (_req, res) => {
    res.send("Hello world");
});

connectToDatabase();

//routes
app.use("/user", userRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Log the server status
});



