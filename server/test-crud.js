const { Board, Card, List, User } = require("./models/Relations")

// Funciones de prueba
// Crear una tarjeta 
const create_test = async( listId ) =>{
    try {
        const list = await List.findByPk(listId);
        console.log(list)
        const card = await list.createCard({
            title: "Tarea prueba 4",
            description: "Tarea prueba 4 - Terminada",
            start_date: "01-03-2026",
            deadline: "12-12-2026"
        });
        console.log(card.id)
        return card
    } catch (error) {
        console.error(error)
    }
}

const read_test = async(id) =>{
    try {
        const loaded_board = await Board.findAll(
            { where:{
                id
            } ,
            include: [
                {
                    model: List,
                    include: [
                        { 
                            model: Card
                        }   
                    ]
                }
            ]
        });
        console.log(loaded_board[0].dataValues)
        console.log(loaded_board[0].dataValues.Lists[0].dataValues)
        console.log(loaded_board[0].dataValues.Lists[0].dataValues.Cards[0].dataValues)
    } catch (error) {
        console.error(error)
    }
}

const update_test = async( listId ) =>{
    try {
        const list = await List.update(
            { title: 'Por Hacer' }, // Values to update
            {
                where: {
                    id: listId // Condition
                }
        });
        
        console.log(list)
        return list
    } catch (error) {
        console.error(error)
    }
}

const delete_test = async( cardId ) =>{
    try {
        const list = await Card.destroy(
            {
                where: {
                    id: cardId // Condition
                }
        });
        
        console.log(list)
        return list
    } catch (error) {
        console.error(error)
    }
}

const test = async() =>{
    try {
        await create_test(1)
        await read_test(1)
        await update_test(1)
        await delete_test(3)
        console.log("Se realizaron las pruebas con exito")
    } catch (error) {
        console.log(error)
    }
}

test();