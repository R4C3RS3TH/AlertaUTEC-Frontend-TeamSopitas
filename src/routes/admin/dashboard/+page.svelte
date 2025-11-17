<script lang="ts">
	import { mockIncidents } from '$lib/mocks/incidents.js';
	import IncidentItem from '$lib/components/Incidentes/IncidentItem.svelte';
	const role = 'admin';

	type IncidentStatusType = 'pendiente' | 'en_atencion' | 'resuelto';
	// Tu tipo 'Incident' es correcto. Define la forma estricta.
	type Incident = (typeof mockIncidents)[0] & {
		estado: IncidentStatusType;
	};

	// --- 👇 SOLUCIÓN: ASERCIÓN DE TIPO 👇 ---
	// Creamos una nueva variable 'incidents' que le dice a TypeScript
	// que "trate" a 'mockIncidents' como si fuera del tipo 'Incident[]'.
	const incidents: Incident[] = mockIncidents as Incident[];
</script>

<div class="p-4 md:p-8">
	<h1 class="mb-6 text-3xl font-bold">Panel de Administración</h1>

	<div class="mb-6 flex gap-4">
		<select class="rounded border p-2">
			<option>Filtrar por Tipo</option>
		</select>
		<select class="rounded border p-2">
			<option value="todos">Todos los Estados</option>
			<option value="pendiente">Pendiente</option>
			<option value="en_atencion">En Atención</option>
		</select>
	</div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each incidents as incident (incident.id)}
			<IncidentItem {incident} {role} />
		{/each}
	</div>
</div>
