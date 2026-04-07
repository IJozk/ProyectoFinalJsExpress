const URL_BASE_API = process.env.URL_BASE_API || "";

module.exports = {
    createBoard: async(req,res)=>{
        try {
            const token = req.cookies.token;

            if(!req.cookies.token){
                return res.redirect("/")
            }

            const datos = req.body;

            const url = `${URL_BASE_API}/board/createBoard`

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

            return res.redirect('/dashboard');
        } catch (error) {
            return res.send({error: error})
        }
    },
    deleteBoard: async(req,res) => {

        const token = req.cookies.token;

        if(!req.cookies.token){
            return res.redirect("/")
        }

        const id = req.params.id;

        const url = `${URL_BASE_API}/board/deleteboard/${id}`
        
        try {
            const response = await fetch(url, {
                method: 'DELETE', // Método de la petición
                headers: {
                    'Content-Type': 'application/json' ,// Indicamos que enviamos JSON
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                return res.redirect('/dashboard')
            } else {
                return res.redirect('/dashboard')
            }
        } catch (error) {
            console.error("Error de red:", error);
            return res.status(500).json({ ok: false })
        }
        
    },
    updateBoard: async(req, res) => {
        try {

            const token = req.cookies.token;
            if(!req.cookies.token){
                return res.redirect("/")
            }

            const datos = req.body;
            const id = req.params.id;
            const url = `${URL_BASE_API}/board/updateboard/${id}`

            const respuesta = await fetch(url, {
                    method: 'PATCH', // Método de la petición
                    headers: {
                        'Content-Type': 'application/json' ,// Indicamos que enviamos JSON
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(datos) // El objeto convertido a string
                });

            if(respuesta.status === 500){
                return res.redirect("/login")
            }

            return res.redirect('/dashboard');
        } catch (error) {
            return res.send({error: error})
        }
    },
}