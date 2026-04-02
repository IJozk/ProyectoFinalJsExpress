require("dotenv").config();
const { expressjwt: jwtMiddleware } = require('express-jwt');

// Este middleware verificará el token en la cabecera 'Authorization: Bearer <token>'
const authMiddle = jwtMiddleware({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});

module.exports = authMiddle;