import { sequelize } from "../config/db.js";
import { DataTypes }  from 'sequelize';

const Board = sequelize.define(
    'Board',
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
        beforeCreate: async (board) => {
            const count = await Board.count({ where: { UserId: board.UserId } });
            board.order = count + 1;
            }  
        }
    }
);

export default Board;