const { Board } = require("../models/Relations")

const createBoard = async(req, res) =>{
    try {
        const  title   = req.body.title || "";
        const description = req.body.description || "";
        const id = req.auth.id;
        if(!title || title === ""){
            return res.status(400).json({ status: 'error', error: 'Title is required' });
        }
        const newBoard = await Board.create({title, description, UserId: id})
        return res.status(201).location(`/api/v1/boards/${newBoard.id}`).json({ status: 'success', data: newBoard });
    } catch (error) {
        console.error('Error al insertar una nueva tablero:', error);
        return res.status(500).send('Error al crear la tablero');
    }
}

const deleteBoard = async(req, res) =>{
    try {
        const id = req.params.id;
        await Board.destroy({where: {id}});
        return res.status(204).send("Tablero eliminado");
    } catch (error) {
        console.error('Error al eliminar un tablero:', error);
        return res.status(500).send('Error al eliminar el tablero');
    }
}

const updateBoard = async(req, res) =>{
    try {
        const title = req.body.title || "";
        const description = req.body.description || "";
        const id = req.body.id;
        const affectedRows = await Board.update(
            {title, description}, 
            {where: {id: id}}
        )
        if(affectedRows > 0){
            res.status(201).location(`/api/v1/cards/${newCard.id}`).json({ status: 'success'});
        }
        else{
            res.status(204).json({ status: 'failed'});
        }
    } catch (error) {
        console.error('Error al insertar una nueva tarjeta:', error);
        res.status(500).send('Error al crear la tarjeta');
    }
}

module.exports = {
    createBoard,
    deleteBoard,
    updateBoard
}