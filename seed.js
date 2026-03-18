const  sequelize  = require("./config/db.js");
const { User, Board, List, Card  } = require('./models/Relations.js');

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

const syncdb = async () =>{
    try {
        await sequelize.sync({ force: true });
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

        const usersdata = []

        nuevosUsuarios.forEach( element  => {
            usersdata.push({
                id: element.dataValues.id,
                nombre: element.dataValues.name,
                email: element.dataValues.email
            })
        })
        
        console.log("Se añadieron usuarios para pruebas")
        console.table(usersdata)

        const nuevoTablero1 = await nuevosUsuarios[1].createBoard({
            title: "Proyecto prueba 1",
            description: "Proyecto de desarrrollo de software"
        })

        const nuevoTablero2 = await nuevosUsuarios[2].createBoard({
            title: "Proyecto prueba 2",
            description: "Proyecto de desarrrollo de software 2"
        })

        const tablasNuevas = [{
            id: nuevoTablero1.dataValues.id  ,
            title:  nuevoTablero1.dataValues.title,
            description: nuevoTablero1.dataValues.description
        }, {
            id: nuevoTablero2.dataValues.id  ,
            title:  nuevoTablero2.dataValues.title,
            description: nuevoTablero2.dataValues.description
        } ]

        console.log("Se añadieron tableros  para pruebas")
        console.table(tablasNuevas)

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

        const listasNuevas = [{
            title:  nuevalista.dataValues.title,
            description: nuevalista.dataValues.description
        }, {
            title: nuevalista2.dataValues.title  ,
            description:  nuevalista2.dataValues.description
        } , {
            title: nuevalista3.dataValues.title  ,
            description:  nuevalista3.dataValues.description
        }]

        console.log("Se añadieron listas para pruebas")
        console.table(listasNuevas)

        const card1 = await nuevalista.createCard({
            title: "Tarea prueba 1",
            description: "Tarea prueba 2 - Por hacer",
            start_date: "01-01-2026",
            deadline: "10-12-2026"
        })

        const card2 =await nuevalista2.createCard({
            title: "Tarea prueba 2",
            description: "Tarea prueba 2 - Ejecutandose",
            start_date: "01-02-2026",
            deadline: "11-12-2026"
        })

        const card3 =await nuevalista3.createCard({
            title: "Tarea prueba 3",
            description: "Tarea prueba 3 - Terminada",
            start_date: "01-03-2026",
            deadline: "12-12-2026"
        })

        const cardsNuevas = [{
            title:  card1.dataValues.title,
            description: card1.dataValues.description,
            start_date: card1.dataValues.start_date,
            deadline: card1.dataValues.deadline
        }, {
            title: card2.dataValues.title  ,
            description:  card2.dataValues.description,
            start_date: card2.dataValues.start_date,
            deadline: card2.dataValues.deadline
        } , {
            title: card3.dataValues.title  ,
            description:  card3.dataValues.description,
            start_date: card3.dataValues.start_date,
            deadline: card3.dataValues.deadline
        }]

        console.log("Se añadieron cards para pruebas")
        console.table(cardsNuevas)
        
    }catch(e){
        console.error(e)
    }
}

const resetdb = async() =>{
    try {
        await syncdb();
        await datosPrueba();
    } catch (error) {
        console.log(error)
    }
}

resetdb();