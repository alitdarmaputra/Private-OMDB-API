require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const pino = require("pino-http")();

// Controller
const getMovieController = require("../controllers/getMovieController");

// Middleware
app.use(bodyParser.json());
app.use(pino);

// Endpoint
app.get("/movies/:title", getMovieController);
app.get("/", (req, res) => {
    res.send("Wellcome to OMDB Private API");
});

module.exports = app;