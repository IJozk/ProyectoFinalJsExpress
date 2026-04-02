const express = require("express");
const path = require('path');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');

const helpershbs = require("../helpers/handlebars")

const helpersTasks = require("../helpers/crudTasks")

const app = express();

const PORT = 3030;

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main', // Archivo layout por defecto
    layoutsDir: path.join(__dirname, '../views/layouts'),
    partialsDir: path.join(__dirname, '../views/partials'),
    helpers: helpershbs
}));

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules/bootstrap/dist')))

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cookieParser());

app.get('/', (req, res) => {
    res.render("home")
})

app.get('/login', (req, res) => 
    res.render('login')
)

app.get('/register', (req, res) => 
    res.render('register')
)

app.post('/register', async(req, res) => {
    try {

        console.log("REGISTRANDO ....")

        const url = "http://localhost:3031/api/v1/auth/register"

        const datos = {
            email: req.body.email,
            password: req.body.password,
            userName: req.body.username
        }

        const respuesta = await fetch(url, {
            method: 'POST', // Método de la petición
            headers: {
                'Content-Type': 'application/json' // Indicamos que enviamos JSON
            },
            body: JSON.stringify(datos) // El objeto convertido a string
        });

        const response = await respuesta.json();
        console.log(response);

        if(response.error){
            res.redirect('/register')
        }else{
            res.redirect('/login')
        }

    } catch (error) {
        console.error('Error en la petición:', error);
    }
})

app.post('/login', async(req, res) => {

    try {
        console.log("LOGUEANDO ....")

        const url = "http://localhost:3031/api/v1/auth/login"

        const datos = {
            email: req.body.email,
            password: req.body.password
        }

        const respuesta = await fetch(url, {
            method: 'POST', // Método de la petición
            headers: {
                'Content-Type': 'application/json' // Indicamos que enviamos JSON
            },
            body: JSON.stringify(datos) // El objeto convertido a string
        });

        const response = await respuesta.json();
        console.log(response);

        if(response.error){
            res.redirect('/login')
        }else{
            const token = response.token

            console.log(token)

            // Guardar token en la Cookie
            res.cookie('token', token, {
                httpOnly: true,    // Impide el acceso desde JavaScript (protección XSS)
                secure: false,      // Solo se envía sobre HTTPS (usar false en desarrollo local)
                sameSite: 'strict', // Mitiga ataques CSRF
                maxAge: 3600000    // Tiempo de vida en milisegundos (1 hora)
            });
            res.redirect('/dashboard')
        }
    } catch (error) {
        console.error('Error en la petición:', error);
    }
})

app.get('/dashboard', async(req, res) => {

    try {

        const token = req.cookies.token;
        if(!req.cookies.token){
            res.redirect("/")
        }

        const url = "http://localhost:3031/api/v1/user/getUserData"
        const respuesta = await fetch(url, {
                method: 'POST', // Método de la petición
                headers: {
                    'Content-Type': 'application/json' ,// Indicamos que enviamos JSON
                    'Authorization': `Bearer ${token}`
                },
                // body: JSON.stringify(datos) // El objeto convertido a string
            });

        if(respuesta.status === 500){
            res.redirect("/login")
        }

        const data  = await  respuesta.json();
        console.log(data.user)
        console.log(data.tableros)

        // const tareasTodo = helpersTasks.leerTareas("Por hacer");
        // const tareasInProgress = helpersTasks.leerTareas("En progreso");
        // const tareasDone = helpersTasks.leerTareas("Hecho");
        res.render("dashboard", {user: data.user, tableros: data.tableros });
    } catch (error) {
        res.send({error: error})
    }
})

app.post('/nuevoTablero', async(req, res) => {
    console.log("Nuevo tablero")
    try {
        const token = req.cookies.token;

        if(!req.cookies.token){
            res.redirect("/")
        }

        const datos = req.body;

        const url = "http://localhost:3031/api/v1/board/createBoard"

        const respuesta = await fetch(url, {
                method: 'POST', // Método de la petición
                headers: {
                    'Content-Type': 'application/json' ,// Indicamos que enviamos JSON
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(datos) // El objeto convertido a string
            });

        if(respuesta.status === 500){
            res.redirect("/login")
        }

        console.log(respuesta)
        // console.log("Nueva tarea creada con exito", JSON.stringify(nuevaTarea))
        res.redirect('/dashboard');
    } catch (error) {
        res.send({error: error})
    }
    
})

app.post('/nuevaTarea', (req, res) => {
    const nuevaTarea = helpersTasks.tareaNueva(req);
    console.log("Nueva tarea creada con exito", JSON.stringify(nuevaTarea))
    res.redirect('/dashboard');
})


app.post('/moverTarea', (req, res) => {
    const id = req.body.id; 
    const estado = req.body.estado; 

    console.log(id)
    console.log(estado)
    helpersTasks.cambioEstado(id, estado);
    res.redirect('/dashboard');
})

app.get('/eliminarTarea/:id', (req, res) => {
    const id = req.params.id;
    helpersTasks.eliminarMensaje(id);
    res.redirect('/dashboard');
})


app.listen(PORT, () => console.log(`Servidor ejecutandose en  http://localhost:${PORT} !`))