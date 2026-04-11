import { User, Board, List, Card } from "../models/Relations.js";

// Create user
const getUserData =async (req, res) => {
    try {

        const id = req.auth.id
        const user = await User.findByPk(id, {
            attributes: ['id', 'userName', 'email']
        });

        const boards = await Board.findAll({
            where: { UserId: id },
            include: [
                {
                    model: List,
                    include: [{ model: Card }]
                }
            ]
        });

        // Convertir a objetos planos para Handlebars
        const loadedBoards = boards.map(board => board.get({ plain: true }));

        return res.status(200).json({ user: user.dataValues, tableros: loadedBoards })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Error del servidor "})
    }
}

export default { getUserData };