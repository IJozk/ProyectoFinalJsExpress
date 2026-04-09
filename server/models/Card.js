import { sequelize } from "../config/db.js";
import { DataTypes }  from 'sequelize';

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
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: true,
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
    hooks: {
        beforeCreate: async (card) => {
            const count = await Card.count({ where: { ListId: card.ListId } });
            card.order = count + 1;
            }  
        }
    }
);

export default Card;