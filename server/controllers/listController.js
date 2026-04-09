import { List, Board } from "../models/Relations.js";

const createList = async(req, res) =>{
    try {
        const  title   = req.body.title || "";
        const description = req.body.description || "";
        const boardId = req.body.boardId || "";
        // Validacion de board perteneciente al usuario
        const tablero = await Board.findAll({
            where:{
                id : boardId,
                UserId: req.auth.id
            }
        })
        if(!tablero || tablero == []) {
            return res.status(404).json({ status: 'error', error: 'No se encontro el tablero' });
        }
        if(!title || title === ""){
            return res.status(400).json({ status: 'error', error: 'Title is required' });
        }
        const newList = await tablero[0].createList({title, description})
        res.status(201).location(`/api/v1/Lists/${newList.id}`).json({ status: 'success', data: newList });
    } catch (error) {
        console.error('Error al insertar una nueva lista:', error);
        res.status(500).send('Error al crear la lista');
    }
}

const deleteList = async(req, res) =>{
    try {
        const id = req.params.id;
        await List.destroy({where: {id}});
        return res.status(204).send("List eliminada");
    } catch (error) {
        console.error('Error al eliminar una lista:', error);
        res.status(500).send('Error al eliminar la lista');
    }
}

const updateList = async(req, res) =>{
    try {
        const title = req.body.title || "";
        const description = req.body.description || "";
        const id = req.params.id;
        const affectedRows = await List.update(
            {title, description}, 
            {where: {id: id}}
        )
        if(affectedRows > 0){
            res.status(201).location(`/api/v1/lists/${id}`).json({ status: 'success'});
        }
        else{
            res.status(204).json({ status: 'failed'});
        }
    } catch (error) {
        console.error('Error al insertar una nueva tarjeta:', error);
        res.status(500).send('Error al crear la tarjeta');
    }
}

export {
    createList,
    deleteList,
    updateList
}