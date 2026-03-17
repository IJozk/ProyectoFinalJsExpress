const  sequelize  = require("../config/db.js")
const { DataTypes } = require('sequelize');

const List = sequelize.define(
    'List',
    {
        // Model attributes are defined here
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }
);

module.exports = List;