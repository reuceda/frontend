
$(document).ready(function () {
	"use strict";

	var fechaActual = new Date();

	// Inicializa el calendario y carga eventos
	$('#calendar-fisica').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay,listMonth'
		},
		defaultDate: fechaActual.getTime(),
		navLinks: true,
		businessHours: {
			dow: [1, 2, 3, 4, 5, 6],
			start: '08:00', // Hora de inicio
			end: '16:00' // Hora de fin
		},
		editable: false,
		droppable: true,
		dayClick: function (date, jsEvent, view) {
			// Formatear la fecha en formato dd-mm-yy
			var formattedDate = date.format('DD-MM-YY');
			window.parent.postMessage({
				type: 'calendarDate',
				date: formattedDate
			}, '*');
		},
		eventClick: function (event, jsEvent, view) {
			$(document).ready(function () {
				swal({
					title: "Qué desea hacer?",
					text: "Si elimina esta cita no podrá recuperarla.",
					type: "warning",
					showCancelButton: true,
					confirmButtonClass: "btn-danger",
					confirmButtonText: "Eliminar",
					cancelButtonText: "Editar",
					closeOnConfirm: false,
					closeOnCancel: true
				},
				function(isConfirm) {
					if (isConfirm) {
						swal("Eliminada!", "Esta operación ha sido realizada exitosamente.", "success");
					} else {
						swal("Cancelled", "Your imaginary file is safe :)", "error");
					}
				});
			});
		}
	});

	loadEvents(); // cargar las citas de ese servicio al calendario

});

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
	return null;
}

async function loadEvents() {
	try {
		const accessToken = getCookie('access-token');
		const refreshToken = getCookie('refresh-token');
		const response = await fetch('http://localhost:8080/api/citas', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'accesstoken': accessToken,
				'refreshtoken': refreshToken,
				'origin': 'web',
			},
		});

		const events = await response.json();

		const eventos = events.map(event => {
			const serviceName = event.servicios.nombre;
			const eventTime = moment(event.fechahora).format('HH:mm');
			const patientName = `${event.paciente.firstname} ${event.paciente.lastname}`; // Obtener el nombre del paciente

			// Filtrar por servicio seleccionado
			if (serviceName !== 'Terapia Física') {
				return null; // No incluir este evento si no coincide con el servicio seleccionado
			}

			return {
				id: event.id,
				title: `${patientName}`, // Mostrar hora y nombre del paciente
				start: moment(event.fechahora).format('YYYY-MM-DDTHH:mm:ss'),
				constraint: 'businessHours',
				borderColor: '#23a7ff',
				backgroundColor: '#afdfff',
				textColor: '#000000'
			};
		}).filter(event => event !== null); // Filtrar eventos nulos

		$('#calendar-fisica').fullCalendar('addEventSource', eventos);

	} catch (error) {
		console.error('Error al obtener eventos:', error);
		return [];
	}
}
window.addEventListener('hola', function (event) {
	if (event.origin === 'http://localhost:3000') {
		if (event.data.type === 'calendarDate') {
			handleCalendarDate(event.data.date);
		}
	}
});

function handleCalendarDate(date) {
	
}


