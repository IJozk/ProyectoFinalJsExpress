import Sequelize from 'sequelize';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.ts';

const   user = process.env.DB_USER;
const   host= process.env.DB_HOST;
const   database= process.env.DB_NAME;
const   password= process.env.DB_PASSWORD;
const   port= process.env.DB_PORT;

const db_url = process.env.DB_URL_CONNECT;

// const sequelize = new Sequelize( database, user, password, {
//     host: host,
//     dialect: 'postgres',
//     logging: false,
//     port: port,
//     ssl: {
//         require: true,
//         rejectUnauthorized: false
//     }
// });

const sequelize = new Sequelize(db_url, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
        require: true,
        rejectUnauthorized: false
        }
    }
});

const adapter = new PrismaPg({ connectionString: process.env.DB_URL_CONNECT });
const prisma = new PrismaClient({ adapter });


export { sequelize, prisma };