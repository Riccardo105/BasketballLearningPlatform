// Imports
require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session");
const jwt = require("jsonwebtoken");
const connectToDatabase = require ('./config/db');

// routers imports
const userRouter = require("./routes/userRoute");
const exerciseRouter = require("./routes/exerciseRoute");
const positionPlanRouter = require ("./routes/positionPlanRoute");
const sessionHistoryRouter = require("./routes/sessionHistoryRoutes")

// Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


// Cookie session setup
app.use (
    cookieSession({
        name: "Riccardo-session",
        keys: [process.env.COOKIE_KEY],
        httpOnly: true,
    })
);


// simple route to test server
app.get("/", (_req, res) => {
    res.send("Hello world");
});

// run connetion to database from db.js
connectToDatabase();

//routes
app.use("/users", userRouter);
app.use("/exercises", exerciseRouter);
app.use("/positionPlan", positionPlanRouter);
app.use("/sessionHistory", sessionHistoryRouter);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Log the server status
});

