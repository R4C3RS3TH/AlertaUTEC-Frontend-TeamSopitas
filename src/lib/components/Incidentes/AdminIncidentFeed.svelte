<script lang="ts">
	import IncidentItem from './IncidentItem.svelte'; // El componente de "tarjeta"
	import { mockIncidents } from '$lib/mocks/incidents.js';

	// Definimos los tipos
	type IncidentStatusType = 'pendiente' | 'en_atencion' | 'resuelto';
	type Incident = (typeof mockIncidents)[0] & {
		estado: IncidentStatusType;
	};

	export let incidents: Incident[];
	export let role: string;
</script>

<main class="flex-grow bg-gray-50 p-4 md:p-8">
	<div class="mx-auto max-w-3xl">
		<div class="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
			<h1 class="text-3xl font-bold text-gray-900">Panel de Incidentes</h1>
			<a
				href="/reportar"
				class="w-full shrink-0 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-700 sm:w-auto"
			>
				Reportar Nuevo Incidente
			</a>
		</div>

		<div class="space-y-4">
			{#each incidents as incident (incident.id)}
				<IncidentItem {incident} {role} />
			{/each}
		</div>
	</div>
</main>
