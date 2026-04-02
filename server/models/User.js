const  sequelize  = require("../config/db.js")
const { DataTypes } = require('sequelize');

const User = sequelize.define(
    'User',
    {
        // Model attributes are defined here
        id:{
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        userName:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);

module.exports = User;