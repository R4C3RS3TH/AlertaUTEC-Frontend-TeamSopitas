<script lang="ts">
	import IncidentStatus from '$lib/components/ui/IncidentStatus.svelte';
	import type { mockIncidents } from '$lib/mocks/incidents.js';

	// Definimos el tipo de estado (pendiente, etc.)
	type IncidentStatusType = 'pendiente' | 'en_atencion' | 'resuelto';

	// Definimos el tipo de Incidente
	type Incident = (typeof mockIncidents)[0] & {
		estado: IncidentStatusType;
	};

	export let incident: Incident;

	function formatDateTime(dateString: string) {
		return new Date(dateString).toLocaleString('es-PE', {
			timeStyle: 'short'
		});
	}
</script>

<div class="flex justify-start">
	<div class="max-w-sm rounded-md rounded-tl-none bg-gray-200 p-3 text-gray-900 shadow-sm">
		<div class="mb-2">
			<div class="text-sm font-bold text-gray-700">{incident.tipo}</div>
			<div class="text-xs font-medium text-gray-500">{incident.ubicacion}</div>
		</div>

		<p class="mb-2 text-sm">{incident.descripcion}</p>

		<div class="flex items-center justify-between gap-3 border-t border-gray-300 pt-1">
			<IncidentStatus status={incident.estado} />
			<span class="text-xs text-gray-500">
				{formatDateTime(incident.fecha)}
			</span>
		</div>
	</div>
</div>
