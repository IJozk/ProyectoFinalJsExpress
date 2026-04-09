import sequelize  from "../config/db.js";
import { DataTypes }  from 'sequelize';

const User = sequelize.define(
    'User',
    {
        // Model attributes are defined here
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
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

export default User;