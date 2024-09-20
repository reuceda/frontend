
async function init() {
    cargarPacientes();
    mostrar_formulario(false);
}

init();

async function cargarPacientes() {
    const accessToken = getCookie('access-token');
    const refreshToken = getCookie('refresh-token');
    
    try {
        const response = await fetch('http://localhost:8080/api/pacientes', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'accesstoken': accessToken,
                'refreshtoken': refreshToken,
                'origin': 'web',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Obtener el select por su ID
        const cmbPacientes = document.getElementById('cmbpacientes');

        // Limpiar el select antes de agregar nuevas opciones
        cmbPacientes.innerHTML = '';

        // Agregar las opciones
        data.forEach(paciente => {
            const option = document.createElement('option');
            option.value = paciente.id; // Asumiendo que 'id' es la clave del paciente
            option.textContent = `${paciente.firstname} ${paciente.lastname}`; // Ajusta esto según la estructura de tu objeto
            cmbPacientes.appendChild(option);
        });

    } catch (error) {
        console.error('Error en la verificación:', error);
        alert('Ha ocurrido un error cargando los usuarios: ' + error.message);
    }
}


function crear() {

}

function editar() {
    alert("editar");
}

function eliminar() {
    alert("eliminar");
}

function listar() {
    //alert("listar");
}

function mostrar_formulario(bandera) {

    if (bandera == true) {
        $("#calendario").hide();
        $("#btncrearcita").hide();
        $("#formulario").show();
        $("#botones_control").show();
    } else {
        listar();
        $("#calendario").show();
        $("#btncrearcita").show();
        $("#formulario").hide();
        $("#botones_control").hide();
    }
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}