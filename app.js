// Imports
require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session");
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken");
const connectToDatabase = require ("./src/config/db");
const expressLayouts = require('express-ejs-layouts');
const path = require("path");


// Api routers imports
const userRouter = require("./src/ServerRoutes/UserApiRoutes");
const exerciseRouter = require("./src/ServerRoutes/ExerciseApiRoutes");
const sessionHistoryRouter = require("./src/ServerRoutes/SessionHistoryApiRoutes");

// pages routes imports
const pagesRouter = require("./src/ServerRoutes/PagesRoutes");

// Middleware
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// set up a boolean to check presence of a token.
// this is used for dynamic update of profileMenu partial
app.use((req, res, next) => {
    res.locals.isLoggedIn = !!req.cookies.token;
    next();
  });


app.use(cors());
app.use(expressLayouts);


// set EJS as the templating engine
app.set('view engine', 'ejs');
app.use(express.static("./public"));
app.set('views', path.join(__dirname, 'src/views'));
app.set("layout extractScripts", true )

app.get("/", (_req, res) => {
    res.render('pages/home', { title: "home"});
});



// Api routes
app.use("/users", userRouter);
app.use("/exercises", exerciseRouter);
app.use("/sessionHistory", sessionHistoryRouter);

// pages routes
app.use("/", pagesRouter)


// run connetion to database from db.js
connectToDatabase();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Log the server status
});

