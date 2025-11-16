<script>
	import { mockIncidents } from '$lib/mocks/incidents.js';
	import IncidentCard from '$lib/components/Incidentes/IncidentCard.svelte';
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
		{#each mockIncidents as incident (incident.id)}
			<IncidentCard {incident} />
		{/each}
	</div>
</div>
