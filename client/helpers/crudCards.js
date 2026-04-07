const URL_BASE_API = process.env.URL_BASE_API || "";

module.exports = {
    createCard: async(req, res) => {
        try {
            const token = req.cookies.token;

            if(!req.cookies.token){
                return res.redirect("/")
            }

            const datos = req.body;

            const url = `${URL_BASE_API}/card/createCard`

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
    deleteCard: async(req,res) => {

        const token = req.cookies.token;

        if(!req.cookies.token){
            return res.redirect("/")
        }

        const id = req.params.id;

        const url = `${URL_BASE_API}/card/deleteCard/${id}`
        
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
    updateCard: async(req, res) => {
        try {

            const token = req.cookies.token;
            if(!req.cookies.token){
                return res.redirect("/")
            }

            const datos = req.body;
            const id = req.params.id;
            const url = `${URL_BASE_API}/card/updateCard/${id}`

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