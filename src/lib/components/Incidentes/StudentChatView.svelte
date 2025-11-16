<script lang="ts">
	import { mockIncidents } from '$lib/mocks/incidents.js';
	import IncidentBubble from './IncidentBubble.svelte';
	import ChatInput from './ChatInput.svelte';

	// Definimos los tipos
	type IncidentStatusType = 'pendiente' | 'en_atencion' | 'resuelto';
	type Incident = (typeof mockIncidents)[0] & {
		estado: IncidentStatusType;
	};

	// Esta vista recibe la lista de incidentes
	export let incidents: Incident[];
</script>

<div class="mx-auto flex h-full w-full max-w-xl flex-grow flex-col rounded-lg bg-white shadow-xl">
	<div class="flex-grow space-y-4 overflow-y-auto p-4">
		{#each incidents as incident (incident.id)}
			<IncidentBubble {incident} />
		{/each}
	</div>

	<ChatInput />
</div>
