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
const storeUser = require("../controllers/storeUsersController.js");
const getPoster = require("../controllers/getPosterController");
const loginUser = require("../controllers/loginUserController.js");
const refreshAccessToken = require("../controllers/refreshAccessTokenController.js");
const storeFavoriteMovie = require("../controllers/storeFavoriteMovieController.js");
const getFavoriteMovie = require("../controllers/getFavoriteMovieController.js");
// Middleware
const authMiddleware = require("../middleware/authMiddleware.js");
app.use(bodyParser.json());
app.use(pino);
app.use(cookieParser());

// Endpoint
app.get("/movies/favorite", authMiddleware, getFavoriteMovie);
app.post("/movies/favorite", authMiddleware, storeFavoriteMovie);
app.get("/movies/:title", authMiddleware, getPoster);
app.get("/movies", (req, res) => res.sendStatus(403));
app.get("/users/token", refreshAccessToken)
app.post("/users/login", loginUser);
app.post("/users/signup", storeUser);
app.get("/", (req, res) => {
    res.send("Wellcome to OMDB Private API");
});

module.exports = app;