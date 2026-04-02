const { Board } = require("../models/Relations")

const createBoard = async(req, res) =>{

    try {
        
        const  title   = req.body.title || "";
        const description = req.body.description || "";

        console.log(req.auth)

        const id = req.auth.id;

        if(!title || title === ""){
            return res.status(400).json({ status: 'error', error: 'Title is required' });
        }

        const newBoard = await Board.create({title, description, UserId: id})

        res.status(201).location(`/api/v1/boards/${newBoard.id}`).json({ status: 'success', data: newBoard });

    } catch (error) {
        console.error('Error al insertar una nueva tablero:', error);
        res.status(500).send('Error al crear la tablero');
    }
}

module.exports = {
    createBoard
}