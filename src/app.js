require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const mongoose = require("mongoose");

const connectToDatabase = require ('./config/db');

const app = express();
app.use(express.json());

// simple route to test server
app.get("/", (_req, res) => {
    res.send("Hello world");
});

connectToDatabase();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Log the server status
});