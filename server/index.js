require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const pino = require("pino-http")();

// Database sync
const sequelize = require("../util/database.js");
const User = require("../models/Users.js");
const Favorite_movie = require("../models/Favorite_movie.js");

User.hasMany(Favorite_movie, {
    foreignKey: "user_id",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
sequelize.sync();

// Controller
const storeUserController = require("../controllers/storeUsersController.js");
const getMovieController = require("../controllers/getMovieController");
const loginUserController = require("../controllers/loginUserController.js");
const refreshAccessTokenController = require("../controllers/refreshAccessTokenController.js");

// Middleware
const authMiddleware = require("../middleware/authMiddleware.js");
app.use(bodyParser.json());
app.use(pino);
app.use(cookieParser());

// Endpoint
app.get("/movies/:title", authMiddleware, getMovieController);
app.get("/movies", (req, res) => res.sendStatus(403));
app.get("/users/token", refreshAccessTokenController)
app.post("/users/login", loginUserController);
app.post("/users/signup", storeUserController);
app.get("/", (req, res) => {
    res.send("Wellcome to OMDB Private API");
});

module.exports = app;