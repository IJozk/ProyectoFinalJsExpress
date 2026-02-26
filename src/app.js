const express = require("express");
const path = require('path');
const { engine } = require('express-handlebars');

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

app.get('/', (req, res) => {
    res.render("home")
})

app.get('/login', (req, res) => 
    res.render('login')
)

app.get('/register', (req, res) => 
    res.render('register')
)

app.post('/login', (req, res) => {
    console.log('req.body:', req.body)

    const email = req.body.email;
    const password = req.body.password;
    
    if(email == "user@test.cl" && password == "123456"){
        res.redirect('/dashboard')
    }
    else{
        res.redirect('/')
    }

})

app.get('/dashboard', (req, res) => {
    const tareasTodo = helpersTasks.leerTareas("Por hacer");
    const tareasInProgress = helpersTasks.leerTareas("En progreso");
    const tareasDone = helpersTasks.leerTareas("Hecho");

    res.render("dashboard", {tareasTodo: tareasTodo, tareasInProgress: tareasInProgress, tareasDone: tareasDone});
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