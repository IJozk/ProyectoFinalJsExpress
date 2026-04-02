const { User } = require("../models/Relations")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const crypto = require('crypto');

// REGISTER
const register = async(req, res) =>{

    try {
        console.log(req.body)
        if( !req.body || !req.body.email || !req.body.password || !req.body.userName ){
            return res.status(400).json({ error: "Se requieren datos para el registro"});
        }

        const { email, password, userName } = req.body;

        const compareUser = await User.findOne({ where: {
            email: email,
            userName: userName
        }})

        console.log(compareUser)

        if( compareUser ||  compareUser !== null ){
            return res.status(409).json({ error: "Ya existe un usuario con el nombre que se esta intentando registrar"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const id = crypto.randomUUID();

        console.log(id)

        const newUser = await User.create({
            id,
            userName,
            email,
            password: hashedPassword 
        })

        console.log(newUser)

        res.status(201).json({ status: "success", message: "Se resgistro al usuario correctamente" })        

    } catch (error) {
                res.status(500).send('Error en el servidor');
    }
}

// LOGIN
const login = async(req, res) =>{
    try {

        const email = req.body.email || "";
        const password = req.body.password || "";
        
        const user = await User.findAll({ where: {email: email} })
        if (!user) return res.status(404).json({ error: 'User not found' });

        console.log(user[0].dataValues.password)

        const passwordToCompare = user[0].dataValues.password

        const isValid = bcrypt.compare(password, passwordToCompare);
        if (!isValid)  return res.status(401).json({ error: "Credenciales invalidas"});

        const userId = user[0].dataValues.id

        console.log(userId)

        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log(token)

        return res.status(200).json({ status: "success", message: "Se logeo al usuario correctamente", token: token })
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor"});
    }
}

module.exports ={
    login,
    register
}