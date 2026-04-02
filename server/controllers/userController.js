const User = require("../models/Relations")


// Create user
const getUserData =async (req, res) => {
    try {
        console.log(req.auth.id)
        const user = await User.findByPK(req.auth.id);
        console.log(user)
        return res.status(200).json({user})
    } catch (error) {
        return res.status(500).json({ error: "Error del servidor "})
    }
}

module.exports = {
    getUserData
}