const sequelize = require("../util/database.js");
const { DataTypes } = require("sequelize");

const Token = sequelize.define("Token", {
    token: { 
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Token;