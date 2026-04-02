const { User, Board, List, Card } = require("../models/Relations")


// Create user
const getUserData =async (req, res) => {
    try {
        console.log(req.auth.id)
        const id = req.auth.id
        const user = await User.findByPk(id, {
            attributes: ['id', 'userName', 'email']
        });

        const loadedBoards =  await Board.findAll(
            { raw: true,
            where:{
                UserId: id
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

        console.log("Tableros del usuario")
        console.log(loadedBoards)

        return { user: user.dataValues, tableros: loadedBoards }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Error del servidor "})
    }
}

module.exports = {
    getUserData
}