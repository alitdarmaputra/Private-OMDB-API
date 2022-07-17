const sequelize = require("../util/database.js");
const { DataTypes } = require("sequelize");

const Token = sequelize.define("Token", {
    token: { type: DataTypes.STRING}
});

module.exports = Token;