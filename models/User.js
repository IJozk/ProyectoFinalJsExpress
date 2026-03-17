const  sequelize  = require("../config/db.js")
const { DataTypes } = require('sequelize');

const User = sequelize.define(
    'User',
    {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
);

module.exports = User;