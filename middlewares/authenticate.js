const fetch = require('node-fetch'); // Importa node-fetch para realizar solicitudes HTTP

const authenticate = async (req, res, next) => {
    try {
        const accessToken = req.cookies['accessToken'];
        const refreshToken = req.cookies['refreshToken'];

        const loginResponse = await fetch('http://localhost:8080/verificar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify({accessToken: accessToken, refreshToken: refreshToken})
        });
        if (!loginResponse.ok) {
            return res.render('login');
        }
        const tokens = await loginResponse.json();

        const newaccessToken = tokens.accessToken;
        if (newaccessToken) {
            document.cookie = `accessToken=${newaccessToken}; path=/; samesite=none; secure`;
        }
        next();
        
    } catch (error) {
        // Maneja errores en la solicitud al backend
        console.error('Error  token:', error);
        return res.render('login');
    }
};

module.exports = authenticate;

