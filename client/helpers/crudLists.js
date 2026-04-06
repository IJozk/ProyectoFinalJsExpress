require("dotenv").config();
const URL_BASE_API = process.env.URL_BASE_API || "";

module.exports = {
    createList: async(req,res)=>{
        try {
            const token = req.cookies.token;

            if(!req.cookies.token){
                return res.redirect("/")
            }

            const datos = {
                title: req.body.title,
                description: req.body.description,
                boardId: req.body.boardId
            };

            const url = `${URL_BASE_API}/list/createList`

            const respuesta = await fetch(url, {
                method: 'POST', // Método de la petición
                headers: {
                    'Content-Type': 'application/json' ,// Indicamos que enviamos JSON
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(datos) // El objeto convertido a string
            });

            if(respuesta.status === 500){
                return res.redirect("/login")
            }

            // console.log("Nueva tarea creada con exito", JSON.stringify(nuevaTarea))
            return res.redirect('/dashboard');
        } catch (error) {
            return res.send({error: error})
        }
    }
}