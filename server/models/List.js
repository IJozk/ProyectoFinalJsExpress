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
        order: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
    hooks: {
        beforeCreate: async (list) => {
            const count = await List.count({ where: { BoardId: list.BoardId } });
            list.order = count + 1;
            }  
        }
    }
);

module.exports = List;