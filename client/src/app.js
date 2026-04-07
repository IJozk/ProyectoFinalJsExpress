// IMPORTS
require("dotenv").config();
const express = require("express");
const path = require('path');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');

// HELPERS
const helpershbs = require("../helpers/handlebars");
const helpersTasks = require("../helpers/crudTasks");
const helpersCards = require("../helpers/crudCards");
const helpersDashboard = require("../helpers/dashboard");
const helpersBoard = require("../helpers/crudBoards");
const helpersList = require("../helpers/crudLists");
const helpersAuth = require("../helpers/auth");
const helpers = require("../helpers/index");

// APP
const app = express();

// ENV VARIABLES
const PORT = process.env.PORT || 3030;
const URL_BASE_API = process.env.URL_BASE_API || "";

// ENGINE CONFIG
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main', // Archivo layout por defecto
    layoutsDir: path.join(__dirname, '../views/layouts'),
    partialsDir: path.join(__dirname, '../views/partials'),
    helpers: helpers, 
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));

// EXPRESS CONFIG
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules/bootstrap/dist')))
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// COOKIES CONFIG
app.use(cookieParser());

// ******** ROUTES **********
// --> COMMON
app.get('/', (req, res) => res.render("home"))

// --> AUTH
app.get('/login', (req, res) => res.render('login', { messageError: req.query.messageError }))
app.get('/register', (req, res) => res.render('register', { messageError: req.query.messageError }))
app.post('/logout', (req, res) => res.clearCookie('token').redirect('/'));
app.post('/register', async(req, res) => helpersAuth.register(req,res))
app.post('/login', async(req, res) => helpersAuth.login(req,res))

// --> DASHBOARD
app.get('/dashboard', async(req, res) => helpersDashboard.getDashboardData(req, res))

// --> BOARDS
app.post('/createBoard', async(req, res) => helpersBoard.createBoard(req,res))
app.post('/deleteBoard/:id', async(req, res) => helpersBoard.deleteBoard(req, res))
app.post('/updateBoard/:id', async(req, res) => helpersBoard.updateBoard(req, res))

// --> LISTS
app.post('/createList', async(req, res) => helpersList.createList(req, res))
app.post('/deleteList/:id', async(req, res) => helpersList.deleteList(req, res))
app.post('/updateList/:id', async(req, res) => helpersList.updateList(req, res))

// --> CARDS
app.post('/createCard', async(req, res) =>  helpersCards.createCard(req, res));
app.post('/updateCard/:id', (req, res) => helpersCards.updateCard(req, res))
app.post('/deleteCard/:id', async(req, res) => { helpersCards.deleteCard(req, res) });
// ****************************

// LISTENER
app.listen(PORT, () => console.log(`Servidor ejecutandose en  http://localhost:${PORT} !`))