const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));

// Configuración estática para Bootstrap
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/terapia_fisica', (req, res) => {
    res.render("terapia_fisica");
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
