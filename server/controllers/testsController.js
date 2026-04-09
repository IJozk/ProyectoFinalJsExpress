import { sequelize } from "../config/db.js";

const connectionTest = async(req, res) =>{
    try {
        await sequelize.authenticate();
        return res.json({ msj: "Conexion exitosa."})
    } catch (error) {
        return res.status(500).json({ msj: "Problemas al conectar con la DB.", error: error})
    } finally {
    // Opcional: Cerrar la conexión
        await sequelize.close();
    }   
}

const sync = async() => {
    await sequelize.sync({ force: true });
};

export {
    connectionTest,
    sync
}