const URL_BASE_API = process.env.URL_BASE_API || "";

module.exports = {
    getDashboardData: async(req,res)=>{
        console.log("ENTRANDO AL DASHBOARD") 
        try {

            const token = req.cookies.token;
            if(!req.cookies.token){
                return res.redirect("/")
            }

            const url = `${URL_BASE_API}/user/getUserData`
            const respuesta = await fetch(url, {
                    method: 'POST', // Método de la petición
                    headers: {
                        'Content-Type': 'application/json' ,// Indicamos que enviamos JSON
                        'Authorization': `Bearer ${token}`
                    },
                    // body: JSON.stringify(datos) // El objeto convertido a string
                });
            
            console.log("STATUS:", respuesta.status);

            if(respuesta.status === 500){
                return res.redirect("/login")
            }

            const data  = await  respuesta.json();
            console.log(data.user)
            console.log(data.tableros)

            // const tareasTodo = helpersTasks.leerTareas("Por hacer");
            // const tareasInProgress = helpersTasks.leerTareas("En progreso");
            // const tareasDone = helpersTasks.leerTareas("Hecho");
            return res.render("dashboard", {user: data.user, tableros: data.tableros });
        } catch (error) {
            return res.send({error: error})
        }
    }
}