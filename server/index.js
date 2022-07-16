require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

// Controller

// Middleware
app.use(bodyParser.json());

// Endpoint
app.get("/", (req, res) => {
    res.send("Wellcome to OMDB Private API");
});

module.exports = app;