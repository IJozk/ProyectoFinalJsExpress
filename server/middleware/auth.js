import { expressjwt as jwtMiddleware } from 'express-jwt';

// Este middleware verificará el token en la cabecera 'Authorization: Bearer <token>'
const authMiddle = jwtMiddleware({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});

export default authMiddle;