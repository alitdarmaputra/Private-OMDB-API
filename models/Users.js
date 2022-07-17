const { DataTypes } = require("sequelize");
const sequelize = require("../util/database.js");
const bcrypt = require("bcrypt");

const User = sequelize.define("User", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
    }, 
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }, 
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: async (user, options) => {
            return bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;
            })
            .catch(err => { 
                throw new Error(); 
            });
        }
    }
});

module.exports = User;