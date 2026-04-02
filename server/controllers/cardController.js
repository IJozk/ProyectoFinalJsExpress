const { Card } = require("../models/Relations")

const createCard = async(req, res) =>{

    try {
        
        const title = req.body.title || "";
        const description = req.body.description || "";
        const start_date = req.body.start_date || "";
        const deadline = req.body.deadline || "";
        const responsible_id = req.body.responsible_id || "";

        if(!title || title === ""){
            return res.status(400).json({ status: 'error', error: 'Title is required' });
        }

        const newCard = await Card.create({title, description, start_date, deadline, responsible_id})

        res.status(201).location(`/api/v1/cards/${newCard.id}`).json({ status: 'success', data: newCard });

    } catch (error) {
        console.error('Error al insertar una nueva tarjeta:', error);
        res.status(500).send('Error al crear la tarjeta');
    }
}

module.exports = {
    createCard
}