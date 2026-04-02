require('dotenv').config();
const sequelize = require("./config/db.js")
const express = require('express');
const app = express();
const apiRouter = require('./routes/api');
const { User, Board, Card, List } = require("./models/Relations")
const cors = require("cors")

const PORT = process.env.PORT || 3031;

app.use(express.json());
app.use(cors())

const sync = async() => {
    await sequelize.sync({ force: true });
};

//sync();

// Todas las rutas dentro de api.js tendrán el prefijo /api
app.use('/api/v1', apiRouter);

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));