const { Card, List } = require("../models/Relations")

const createCard = async(req, res) =>{

    try {
        
        const title = req.body.title || "";
        const description = req.body.description || "";
        const start_date = req.body.start_date || Date.now();
        const deadline = req.body.deadline || Date.now();
        const responsible_id = req.auth.id || "";

        const ListId = req.body.listId;

        console.log("ID LISTA"+ListId)

        if(!title || title === ""){
            return res.status(400).json({ status: 'error', error: 'Title is required' });
        }

        const newCard = await Card.create({title, description, start_date, deadline, responsible_id, ListId})

        return res.status(201).location(`/api/v1/cards/${newCard.id}`).json({ status: 'success', data: newCard });

    } catch (error) {
        console.error('Error al insertar una nueva tarjeta:', error);
        return res.status(500).send('Error al crear la tarjeta');
    }
}

const deleteCard = async(req, res) =>{

    try {
        
        const id = req.params.id;
        
        await Card.destroy({where: {id}});

        return res.status(204).send("Card eliminada");

    } catch (error) {
        console.error('Error al eliminar una tarjeta:', error);
        return res.status(500).send('Error al eliminar la tarjeta');
    }
}

const updateCard = async(req, res) =>{

    try {
        
        const title = req.body.title || "";
        const description = req.body.description || "";
        const start_date = req.body.start_date || Date.now();
        const deadline = req.body.deadline || Date.now();
        const responsible_id = req.auth.id || "";
        const id = req.params.id;

        const ListId = req.body.listId;

        console.log("ID LISTA"+ListId)

        const affectedRows = await Card.update(
            {title, description, start_date, deadline, responsible_id, ListId}, 
            {where: {id: id}}
        )

        if(affectedRows > 0){
            return res.status(201).location(`/api/v1/cards/${id}`).json({ status: 'success'});
        }
        else{
            return res.status(204).json({ status: 'failed'});
        }

    } catch (error) {
        console.error('Error al insertar una nueva tarjeta:', error);
        return res.status(500).send('Error al crear la tarjeta');
    }
}

module.exports = {
    createCard,
    deleteCard,
    updateCard
}