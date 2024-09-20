const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
  }));

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));

// Configuración estática para Bootstrap
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    var auth = await verificar(req);
    auth ? res.render("index") : res.render("login");
});

app.get('/terapia-fisica', async (req, res) => {
    var auth = await verificar(req);
    auth ? res.render("terapia-fisica") : res.render("login");
});

app.get('/atencion-medica', async (req, res) => {
    var auth = await verificar(req);
    auth ? res.render("atencion-medica") : res.render("login");
});

app.get('/educacion-especial', async (req, res) => {
    var auth = await verificar(req);
    auth ? res.render("educacion-especial") : res.render("login");
})

app.get('/;escuela-para-padres', async (req, res) => {
    var auth = await verificar(req);
    auth ? res.render("escuela-para-padres") : res.render("login");
});

app.get('/pacientes', async (req, res) => {
    var auth = await verificar(req);
    auth ? res.render("pacientes") : res.render("login");
});

app.get('/index', async (req, res) => {
    var auth = await verificar(req);
    auth ? res.render("index") : res.render("login");
});

app.get('/terapia-psicologica', async (req, res) => {
    var auth = await verificar(req);
    auth ? res.render("terapia-psicologica") : res.render("login");
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

/** */
async function verificar(req) {
    var accessToken = req.cookies['access-token'];
    var refreshToken = req.cookies['refresh-token'];
    const loginResponse = await fetch('http://localhost:8080/verificar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'origin': 'web'
        },
        body: JSON.stringify({ accessToken, refreshToken}),
        credentials: 'include'
    });

    if (loginResponse.status!=200) {
        console.log('!loginResponse.ok '+loginResponse.statusText);
        return false;
    } else {
        const data = loginResponse;
        const newaccessToken = data;
        if (newaccessToken) {
            //setCookie('access-token', newaccessToken, 10); // Expira en 10 minutos
        }
        
    }
    return true;
}