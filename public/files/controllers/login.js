 function init() {
}
init();

async function entrar() {
    const user = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const loginResponse = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'origin': 'web'
            },
            body: JSON.stringify({ username: user, password: password }),
            credentials: 'include'
        });

        if (!loginResponse.ok) {
            alert('Authentication error: ' + loginResponse.status);
            return;
        }

        const data = await loginResponse.json();
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;

        if (accessToken) {
            setCookie('access-token', accessToken, 10); // Expira en 10 minutos
        }

        if (refreshToken) {
            setCookie('refresh-token', refreshToken, 10); // Expira en 10 minutos
        }

        window.location.href = '/index';
    } catch (error) {
        console.error('Error:', error);
    }
}

function setCookie(name, value, minutes) {
    const expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; samesite=strict;`;
}