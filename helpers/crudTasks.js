const fs = require("fs");
const path = require("path");

// Ruta al archivo mensajes.json (ajusta si tu data está en otra carpeta)
const filePath = path.join(__dirname, '..', 'data', 'tasks.json');

module.exports = {
    
    // C: CREATE
    tareaNueva: (req) => {
        try {
            const timestampId = Date.now();

            const id = timestampId;
            const titulo = req?.body?.titulo || '';
            const descripcion = req?.body?.descripcion || '';
            const prioridad = req?.body?.prioridad || '';
            const estado = req?.body?.estado || '';
            const tag = req?.body?.tag || '';
            const fecha_creacion = req?.body?.fecha_creacion || '';
            const fecha_inicio = req?.body?.fecha_inicio || '';
            const fecha_fin = req?.body?.fecha_fin || '';
            const autor = req?.body?.autor || '';
            const responsable = req?.body?.responsable || '';

            // Validar datos requeridos
            // if () {
            //     throw new Error('Faltan campos nombre o mensaje');
            // }

            // Asegura existencia del archivo
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(path.dirname(filePath), { recursive: true });
                fs.writeFileSync(filePath, '[]', 'utf8');
            }

            const raw = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(raw);
            const tareas = data

            const nuevaTarea = { id: id, titulo: titulo, descripcion, prioridad, estado, tag, fecha_creacion, fecha_inicio, fecha_fin, autor, responsable };

            console.log(nuevaTarea)

            tareas.push(nuevaTarea);

            fs.writeFileSync(filePath, JSON.stringify(tareas, null, 2), 'utf8');

            return nuevaTarea;
        } catch (error) {
            console.error('Error en mensajeNuevo:', error);
            return null;
        }
    },
    
    // R: READ
    leerTareas: (filtro) => {
        try {

            if (!fs.existsSync(filePath)) {
                // Devuelve array vacío si aún no existe el archivo
                return ["No se encontraron tareas"];
            }

            const raw = fs.readFileSync(filePath, 'utf8');
            const tareas = JSON.parse(raw);

            const tareasFiltradas = tareas.filter(tarea => tarea.estado == filtro);

            console.log(tareasFiltradas)

            return tareasFiltradas;
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.error('El archivo no existe:', error);
            } else if (error instanceof SyntaxError) {
                console.error('JSON inválido en tareas.json:', error);
            } else {
                console.error('Error leyendo tareas:', error);
            }
            return null;
        }
    },

    // U: UPDATE
    modificarMensaje: (id, tareaMod) =>{
        try {

            const raw = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(raw);
            const tareas = data

            tareas[id].mensaje = tareaMod

            fs.writeFileSync(filePath, JSON.stringify(tareas, null, 2), 'utf8');

        } catch (error) {
            
        }
    },

    // D: DELETE
    eliminarMensaje: (id) => {
        try{

            const raw = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(raw);
            const tareas = data

            if (id > -1 && id < tareas.length) {
                tareas.splice(id, 1);
            }

            fs.writeFileSync(filePath, JSON.stringify(tareas, null, 2), 'utf8')

            return "Tarea eliminada"

        } catch (e) {

        }
    },
    cambioEstado: (id, estado) =>{
        try{
            const raw = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(raw);
            const tareas = data
            // Buscar índice de la tarea por su id
            const indexTarea = tareas.findIndex(t => t.id == id);
            if (indexTarea === -1) {
                throw new Error('Tarea no encontrada');
            }

            // Actualizar estado y persistir
            tareas[indexTarea].estado = estado;

            fs.writeFileSync(filePath, JSON.stringify(tareas, null, 2), 'utf8');

            return tareas[indexTarea];
        }
        catch (e){
            console.error(e)
        }
    }

}