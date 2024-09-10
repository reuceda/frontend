const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fetch = require('node-fetch');

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));

// Configuración estática para Bootstrap
app.use(express.static(path.join(__dirname, 'public')));

/*
app.get('/', async (req, res) => {
    res.render('login');
});
*/

app.get('/', (req, res) => {
    try{
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.json({ authenticated: false });
        }
    
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.render('login');
            }
    
            res.render('index');
        });
    }catch(e){
        res.render('login');
    }
    
});

app.get('/t_fisica', (req, res) => {
    res.render("t_fisica");
});

app.get('/t_psicologica', (req, res) => {
    res.render("t_psicologica");
});

app.get('/protected', (req, res) => {
    res.send('Welcome to the protected route');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
