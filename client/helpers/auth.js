const URL_BASE_API = process.env.URL_BASE_API || "";

module.exports = {
    login: async(req, res) => {
        try {
            console.log("LOGUEANDO ....")

            const url = `${URL_BASE_API}/auth/login`

            const datos = {
                email: req.body.email,
                password: req.body.password
            }

            const respuesta = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });

            if (!respuesta.ok) {
                return res.redirect('/login?messageError=Credenciales incorrectas')
            }

            const response = await respuesta.json();

            if(response.error){
                return res.redirect('/login?messageError=Credenciales incorrectas')
            }else{
                const token = response.token

                console.log(token)

                // Guardar token en la Cookie
                return res.cookie('token', token, {
                    httpOnly: true,    // Impide el acceso desde JavaScript (protección XSS)
                    secure: false,      // Solo se envía sobre HTTPS (usar false en desarrollo local)
                    sameSite: 'strict', // Mitiga ataques CSRF
                    maxAge: 3600000    // Tiempo de vida en milisegundos (1 hora)
                }).redirect('/dashboard');
            }
        } catch (error) {
            console.error('Error en la petición:', error);
            return res.status(500).redirect('/login?messageError=Credenciales incorrectas')
        }
    },
    register: async(req,res) => {
        try {

            console.log("REGISTRANDO ....")

            const url = `${URL_BASE_API}/auth/register`

            const datos = {
                email: req.body.email,
                password: req.body.password,
                userName: req.body.username
            }

            if(req.body.password !== req.body.confirm_password){
                return res.render('register', {
                    messageError: 'Las contraseñas no coinciden',
                    formData: {
                        email: req.body.email,
                        username: req.body.username
                    }
                })
            }

            const respuesta = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });

            if (!respuesta.ok) {
                return res.redirect('/register?messageError=Error en registro')
            }

            const response = await respuesta.json();
            console.log(response);

            if(response.error){
                return res.redirect('/register?messageError=Error en registro')
            }else{
                return res.redirect('/login')
            }

        } catch (error) {
            console.error('Error en la petición:', error);
            return res.redirect('/register?messageError=Error en registro')
        }
    },
}