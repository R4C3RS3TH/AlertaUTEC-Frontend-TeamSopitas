<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/auth';
	import Header from '$lib/components/layout/Sidebar.svelte';

	// --- 👇 ¡CORRECCIÓN! Usamos 'Incidentes' con I mayúscula para coincidir con tu carpeta ---
	import StudentChatView from '$lib/components/Incidentes/StudentChatView.svelte';
	import AdminIncidentFeed from '$lib/components/Incidentes/AdminIncidentFeed.svelte';

	import { mockIncidents } from '$lib/mocks/incidents.js';

	// Definimos los tipos
	type IncidentStatusType = 'pendiente' | 'en_atencion' | 'resuelto';
	type Incident = (typeof mockIncidents)[0] & {
		estado: IncidentStatusType;
	};
	let incidents: Incident[] = [];
	let userRole: 'estudiante' | 'admin' | 'autoridad' | string | null = null;
	// En dashboard/+page.svelte:
	auth.subscribe((value) => {
		// CORRECCIÓN: Accedemos al campo 'rol' (el que viene del backend)
		userRole = value.user?.rol ?? null;
	});

	onMount(() => {
		incidents = mockIncidents as Incident[];
	});
</script>

<div class="flex h-screen flex-col">
	<Header />

	{#if userRole === 'estudiante'}
		<StudentChatView {incidents} />
	{:else if userRole}
		<AdminIncidentFeed {incidents} role={userRole} />
	{/if}
</div>
