window.addEventListener('message', function (event) {
    if (event.data.type === 'calendarDate') {
        var selectedDate = event.data.date;

        // Obtener la fecha actual
        var today = new Date();
        today.setHours(0, 0, 0, 0); // Resetea la hora a medianoche

        // Convertir la fecha seleccionada en un objeto Date
        var parts = selectedDate.split('-');
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10) - 1; // Los meses en JavaScript son de 0 a 11
        var year = 2000 + parseInt(parts[2], 10); // Ajustar el año al siglo XXI

        var dateObj = new Date(year, month, day);

        // Comparar las fechas para veri si la fecha es actual o posterior
        if (dateObj < today) {
            alert('La fecha seleccionada es anterior a la fecha actual');
            return;
        }

        if (dateObj.getDay() === 0) { // getDay() devuelve 0 para domingo
            alert('No se permiten citas en domingo');
            return;
        }

        // Convertir `dateObj` a formato `datetime-local`
        var year = dateObj.getFullYear();
        var month = String(dateObj.getMonth() + 1).padStart(2, '0');
        var day = String(dateObj.getDate()).padStart(2, '0');
        var hours = String(dateObj.getHours()).padStart(2, '0');
        var minutes = String(dateObj.getMinutes()).padStart(2, '0');

        var formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

        // Establecer el valor del campo de entrada
        document.getElementById('fecha_cita').value = formattedDate;

        // Mostrar el formulario
        mostrar_formulario(true);
    }
});
