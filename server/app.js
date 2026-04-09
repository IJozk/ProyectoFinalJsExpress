import 'dotenv/config'
import express from 'express';
import apiRouter from './routes/api.js';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 3031;

app.use(express.json());
app.use(cors())

// Todas las rutas dentro de api.js tendrán el prefijo /api
app.use('/api/v1', apiRouter);

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));