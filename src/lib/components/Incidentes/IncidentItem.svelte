<script lang="ts">
	import IncidentStatus from '$lib/components/ui/IncidentStatus.svelte';
	import type { mockIncidents } from '$lib/mocks/incidents.js';

	// --- 👇 1. DEFINIMOS LOS ESTADOS VÁLIDOS ---
	type IncidentStatusType = 'pendiente' | 'en_atencion' | 'resuelto';

	// --- 👇 2. SOBREESCRIBIMOS EL TIPO 'estado' ---
	// Usamos una intersección (&) para tomar el tipo del mock
	// y forzar a que 'estado' sea de nuestro tipo específico.
	type Incident = (typeof mockIncidents)[0] & {
		estado: IncidentStatusType;
	};

	// Definimos los tipos para las props
	export let incident: Incident;
	// --- 👇 CORRECCIÓN DE TIPO: Añadimos '| string' al final 👇 ---
	export let role: 'estudiante' | 'admin' | 'autoridad' | string;
	function formatDateTime(dateString: string) {
		return new Date(dateString).toLocaleString('es-PE', {
			dateStyle: 'short',
			timeStyle: 'short'
		});
	}
</script>

<div class="rounded-lg border bg-white p-4 shadow-sm">
	<div class="flex items-center justify-between">
		<span class="text-sm font-bold text-blue-800">{incident.tipo}</span>
		<IncidentStatus status={incident.estado} />
	</div>

	<h3 class="my-2 font-semibold text-gray-900">{incident.ubicacion}</h3>
	<p class="mb-3 text-sm text-gray-700">{incident.descripcion}</p>

	{#if role === 'estudiante'}
		<div class="mt-4 flex items-center justify-between border-t pt-3 text-xs text-gray-500">
			<span>Reportado:</span>
			<span>{formatDateTime(incident.fecha)}</span>
		</div>
	{:else if role === 'admin' || role === 'autoridad'}
		<div class="mt-4 border-t pt-3">
			<div class="mb-4 flex items-center justify-between text-xs text-gray-500">
				<span
					>Reportado por:
					<strong class="text-gray-700">{incident.creadoPor}</strong>
				</span>
				<span>{formatDateTime(incident.fecha)}</span>
			</div>
			<div class="flex gap-2">
				<button
					class="rounded-md bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
				>
					Asignar
				</button>
				<button
					class="rounded-md bg-gray-700 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-gray-800"
				>
					Resolver
				</button>
			</div>
		</div>
	{/if}
</div>
