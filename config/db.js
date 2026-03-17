require('dotenv').config();
const { Sequelize } = require('sequelize');

const user = process.env.DB_USER;
const   host= process.env.DB_HOST;
const   database= process.env.DB_NAME;
const   password= process.env.DB_PASSWORD;
const   port= process.env.DB_PORT;

const sequelize = new Sequelize( database, user, password, {
    host: host,
    dialect: 'postgres',
    port: port
});

// export the instance inside an object so destructuring works
module.exports = sequelize;