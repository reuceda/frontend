const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const path = require('path');
//const authenticate = require("./public/files/controllers/authenticate");
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));

// Configuración estática para Bootstrap
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.get('/', async (req, res) => {
    res.render("login");
});

app.get('/terapia-fisica', (req, res) => {
    res.render("terapia-fisica");
});

app.get('/pacientes', (req, res) => {
    res.render("t_fisica");
});

app.get('/t_psicologica', (req, res) => {
    res.render("t_psicologica");
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
