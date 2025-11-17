<script>
	import IncidentStatus from '$lib/components/ui/IncidentStatus.svelte';
	export let incident; // <-- FIX 1: JSDoc define el tipo de la prop

	// Función de ayuda (la puedes mover a lib/utils/helpers.js)
	/**
	 * @param {string} dateString <-- FIX 2: Añadimos el tipo 'string'
	 */
	function formatRelativeTime(dateString) {
		// Por ahora, solo devolvemos la fecha simple
		return new Date(dateString).toLocaleString('es-PE');
	}
</script>

<a
	href="/incidente/{incident.id}"
	class="block rounded-lg border bg-white p-4 shadow transition hover:bg-gray-50"
>
	<div class="mb-2 flex items-center justify-between">
		<span class="text-sm font-bold text-blue-800">{incident.tipo}</span>
		<IncidentStatus status={incident.estado} />
	</div>

	<h3 class="font-semibold text-gray-800">{incident.ubicacion}</h3>
	<p class="truncate text-sm text-gray-600">{incident.descripcion}</p>

	<div class="mt-4 flex items-end justify-between">
		<span class="text-xs text-gray-500">
			Reportado por: {incident.creadoPor}
		</span>
		<span class="text-xs text-gray-500">
			{formatRelativeTime(incident.fecha)}
		</span>
	</div>
</a>
