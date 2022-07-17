const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
});

module.exports = sequelize;