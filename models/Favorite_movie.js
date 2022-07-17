const { DataTypes } = require("sequelize");
const sequelize = require("../util/database.js");

const Favorite_movie = sequelize.define("Favorite_movie", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Favorite_movie;