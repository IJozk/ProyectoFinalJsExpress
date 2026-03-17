const  sequelize  = require("./config/db.js");
const { User, Board, List, Card  } = require('./models/Relations.js');
// const  controller  = require('../controllers/relacionesController.js');
const express = require("express");

const app = express();

// Middleware para realizar peticiones tipo post, put, delete
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Funciones Auxiliares

const prueba = async () =>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return 'Connection has been established successfully.'
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const syncdb = async() =>{
    try {
        await sequelize.sync();
        console.log('Connection has been established successfully.');
        return 'Connection has been established successfully.'
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const datosPrueba = async() => {
    try{
        const nuevosUsuarios = await User.bulkCreate([
            { name: 'María', email: "maria@example.com" },
            { name: 'Juan', email: "juan@example.com" },
            { name: 'Pedro', email:  "pedro@example.com" }
        ]);

        const nuevoTablero1 = await nuevosUsuarios[1].createBoard({
            title: "Proyecto prueba 1",
            description: "Proyecto de desarrrollo de software"
        })

        const nuevoTablero2 = await nuevosUsuarios[2].createBoard({
            title: "Proyecto prueba 2",
            description: "Proyecto de desarrrollo de software 2"
        })

        const nuevalista = await nuevoTablero1.createList({
            title: "Por hacer",
            description: "Tareas por hacer"
        })

        const nuevalista2 = await nuevoTablero1.createList({
            title: "Ejecutandose",
            description: "Tareas en ejecución"
        })

        const nuevalista3 = await nuevoTablero1.createList({
            title: "Terminada",
            description: "Tareas terminadas"
        })

        await nuevalista.createCard({
            title: "Tarea prueba 1",
            description: "Tarea prueba 2 - Por hacer",
            start_date: "01-01-2026",
            deadline: "10-12-2026"
        })

        await nuevalista2.createCard({
            title: "Tarea prueba 2",
            description: "Tarea prueba 2 - Ejecutandose",
            start_date: "01-02-2026",
            deadline: "11-12-2026"
        })

        await nuevalista3.createCard({
            title: "Tarea prueba 3",
            description: "Tarea prueba 3 - Terminada",
            start_date: "01-03-2026",
            deadline: "12-12-2026"
        })
        
    }catch(e){
        console.error(e)
    }
}

datosPrueba();