// Imports
require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session");
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken");
const connectToDatabase = require ("./src/config/db");
const expressLayouts = require('express-ejs-layouts')
const path = require("path");


// Api routers imports
const userRouter = require("./src/routes/api/userRoute");
const exerciseRouter = require("./src/routes/api/exerciseRoute");
const positionPlanRouter = require ("./src/routes/api/positionPlanRoute");
const sessionHistoryRouter = require("./src/routes/api/sessionHistoryRoutes");

// pages routes imports
const pagesController = require("./src/controllers/pages")

// Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());




app.use(cors());
app.use(expressLayouts);



// set EJS as the templating engine
app.set('view engine', 'ejs');
app.use(express.static("./public"));
app.set('views', path.join(__dirname, 'src/views'));
app.set("layout extraScripts", true )

app.get("/", (_req, res) => {
    res.render('pages/home', { title: "home"});
});

// run connetion to database from db.js
connectToDatabase();

// Api routes
app.use("/users", userRouter);
app.use("/exercises", exerciseRouter);
app.use("/positionPlans", positionPlanRouter);
app.use("/sessionHistory", sessionHistoryRouter);

// pages routes
app.use("/", pagesController)




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Log the server status
});

