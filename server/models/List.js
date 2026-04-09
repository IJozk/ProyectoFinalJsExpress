import sequelize  from "../config/db.js";
import { DataTypes }  from 'sequelize';

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

export default List;