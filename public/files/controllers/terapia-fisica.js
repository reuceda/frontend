
async function init() {
    cargarPacientes();
    mostrar_formulario(false);
}

init();

var pacientes = [];

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

        // Verificar si el array de pacientes viene vacío o si tiene pacientes
        if (!Array.isArray(data) || data.length === 0) {
            console.log('No se encontraron pacientes');
            return;
        }

        // Obtener el select por su ID
        const cmbPacientes = document.getElementById('cmbpacientes');

        if (!cmbPacientes) {
            console.error('No se encontró el elemento select con el ID cmbpacientes');
            return;
        }

        // Limpiar el select antes de agregar nuevas opciones
        cmbPacientes.innerHTML = '';
        const option = document.createElement('option');
        option.value = '';
        option.textContent = `Seleccionar`;
        cmbPacientes.appendChild(option);
        // Agregar las opciones al select
        data.forEach(paciente => {
            const option = document.createElement('option');

            // Asegúrate de que los campos `id`, `firstname` y `lastname` existen en `paciente`
            if (paciente.id && paciente.firstname && paciente.lastname) {
                option.value = paciente.id;
                option.textContent = `${paciente.dni} - ${paciente.firstname} ${paciente.lastname}`;
                cmbPacientes.appendChild(option);
                pacientes.push(paciente);
            } else {
                console.warn('Datos incompletos para el paciente:', paciente);
            }
        });

    } catch (error) {
        console.error('Error en la carga de pacientes:', error);
        alert('Ha ocurrido un error cargando los pacientes: ' + error.message);
    }
}

function listarPaciente() {

    
    const idpaciente_elegido = document.getElementById('cmbpacientes').value;

    pacientes.forEach(paciente => {
        if (paciente.id == idpaciente_elegido) {
            document.getElementById('dni').value = paciente.dni;
            document.getElementById('nombres').value = paciente.firstname;
            document.getElementById('apellidos').value = paciente.lastname;
            document.getElementById('fecha_nac').value = paciente.fecha_nacimiento;
            document.getElementById('sexo').value = paciente.sexo;
            document.getElementById('email').value = paciente.email;
            document.getElementById('telefono').value = paciente.telefono;
            document.getElementById('direccion').value = paciente.direccion;
            document.getElementById('nacionalidad').value = paciente.nacionalidad;
        }
    });

    bloquearcampos(true);
}

function bloquearcampos(bloquear) {
    document.getElementById('dni').disabled = bloquear;
    document.getElementById('nombres').disabled = bloquear;
    document.getElementById('apellidos').disabled = bloquear;
    document.getElementById('fecha_nac').disabled = bloquear;
    document.getElementById('sexo').disabled = bloquear;
    document.getElementById('email').disabled = bloquear;
    document.getElementById('telefono').disabled = bloquear;
    document.getElementById('direccion').disabled = bloquear;
    document.getElementById('nacionalidad').disabled = bloquear;
}

function limpiar(){
    $("#cmbpacientes").val('').trigger('change');
    document.getElementById('dni').value = '';
    document.getElementById('nombres').value = '';
    document.getElementById('apellidos').value = '';
    document.getElementById('fecha_nac').value = '';
    document.getElementById('sexo').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('nacionalidad').value = '';

    bloquearcampos(false);
}

function crear_cita() {

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