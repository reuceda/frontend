"use strict";
$(document).ready(function () {

	var businesshours = {
		dow: [1, 2, 3, 4, 5, 6], // Incluye todos los días de la semana
		start: '08:00', // Hora de inicio
		end: '16:00' // Hora de fin
	};

	var header = {
		left: 'prev,next today',
		center: 'title',
		right: 'month,agendaWeek,agendaDay,listMonth'
	};

	var fechaActual = new Date();

	// Inicializa el calendario y carga eventos
	$('#calendar-educacion-especial').fullCalendar({
		header: header,
		defaultDate: fechaActual.getTime(),
		navLinks: true,
		businessHours: businesshours,
		editable: false,
		droppable: false,
		eventClick: function (event, jsEvent, view) {
			if (event.backgroundColor) {
				window.location.href = getServiceUrl(event.backgroundColor); // Redirigir a la URL del servicio
			} else {
				console.log('No hay URL para este evento'); // Mensaje si no hay URL
			}
		}
	});

	// Cargar eventos en el calendario "calendar-todo"
	loadEvents();

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
		console.log(events);

		const eventos = events.map(event => {
			const serviceName = event.servicios.nombre;
			const eventTime = moment(event.fechahora).format('HH:mm');
			const patientName = `${event.paciente.firstname} ${event.paciente.lastname}`; // Obtener el nombre del paciente

			// Filtrar por servicio seleccionado
			if (serviceName !== 'Educación Especial') {
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

		$('#calendar-educacion-especial').fullCalendar('addEventSource', eventos);

	} catch (error) {
		console.error('Error al obtener eventos:', error);
		return [];
	}
}


