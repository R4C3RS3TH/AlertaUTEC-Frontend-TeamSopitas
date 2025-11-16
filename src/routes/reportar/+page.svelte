<script>
	import IncidentForm from '$lib/components/Incidentes/IncidentForm.svelte';

	/**
	 * Maneja el evento de envío del formulario.
	 * @param {CustomEvent<{tipo: string, ubicacion: string, descripcion: string, urgencia: string}>} event
	 */
	function handleReportSubmit(event) {
		// ¡Ahora ya no hay error!
		// El editor sabe que 'event' es un CustomEvent y que 'event.detail'
		// contiene los datos de tu formulario.
		console.log('Datos del formulario listos para enviar:', event.detail);
		alert('¡Simulación de reporte enviado! Revisa la consola (F12).');
	}
</script>

<div class="mx-auto max-w-2xl p-4 md:p-8">
	<h1 class="mb-6 text-3xl font-bold">Reportar un Incidente</h1>
	<p class="mb-6 text-gray-600">
		Describe el problema que encontraste. Tu reporte será enviado directamente al área responsable.
	</p>
	<IncidentForm on:submitIncident={handleReportSubmit} />
</div>
