const  sequelize  = require("../config/db.js")
const { DataTypes } = require('sequelize');

const Card = sequelize.define(
    'Card',
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
        start_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        deadline:{
            type: DataTypes.DATE,
            allowNull: true,
        }, 
        responsible_id:{
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }
);

module.exports = Card;