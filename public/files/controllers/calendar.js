"use strict";
$(document).ready(function () {

	var fechaActual = new Date();

	// Inicializa el calendario y carga eventos
	$('#calendar').fullCalendar({
		locale: 'es',
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay,listMonth'
		},
		defaultDate: fechaActual.getTime(),
		navLinks: true,
		businessHours: {
			dow: [1, 2, 3, 4, 5, 6], // Incluye todos los días de la semana
			start: '08:00', // Hora de inicio
			end: '16:00' // Hora de fin
		},
		validRange: {
			start: fechaActual, 
		},
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
	loadEvents('#calendar');


});

async function loadEvents(calendarId) {
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

		const serviceCounts = {};

		// Define un objeto de colores para los servicios
		const serviceColors = {
			'Terapia Física': '#FFB3BA',
			'Terapia Psicológica': '#FFDFBA',
			'Atención Médica': '#BAFFC9',
			'Educación Especial': '#BAE1FF',
		};

		events.forEach(event => {
			const serviceName = event.servicios.nombre;
			const eventDate = moment(event.fechahora).format('YYYY-MM-DD');

			if (!serviceCounts[eventDate]) {
				serviceCounts[eventDate] = {};
			}

			if (serviceCounts[eventDate][serviceName]) {
				serviceCounts[eventDate][serviceName]++;
			} else {
				serviceCounts[eventDate][serviceName] = 1;
			}
		});

		const eventos = [];
		for (const date in serviceCounts) {
			for (const service in serviceCounts[date]) {
				eventos.push({
					id: `${date}-${service}`,
					title: `${service}: ${serviceCounts[date][service]} citas`,
					start: date,
					constraint: 'businessHours',
					borderColor: serviceColors[service] || '#10598a',
					backgroundColor: serviceColors[service] || '#f7fcff',
					textColor: '#000000'
				});
			}
		}

		$(calendarId).fullCalendar('addEventSource', eventos);

	} catch (error) {
		console.error('Error al obtener eventos:', error);
		return [];
	}
}

function getServiceUrl(service) {
	switch (service) {
		case '#FFB3BA':
			return '/terapia-fisica';
		case '#FFDFBA':
			return '/terapia-psicologica';
		case '#BAFFC9':
			return '/atencion-medica';
		case '#BAE1FF':
			return '/educacion-especial';
		default:
			return '/';
	}
}

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
	return null;
}