<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/auth';
	// Nota: 'Header' es el alias que estás usando para Sidebar.svelte
	import Header from '$lib/components/layout/Sidebar.svelte';

	// Importamos los componentes de las vistas
	import StudentChatView from '$lib/components/Incidentes/StudentChatView.svelte';
	import AdminIncidentFeed from '$lib/components/Incidentes/AdminIncidentFeed.svelte';

	import { mockIncidents } from '$lib/mocks/incidents.js';

	// Definiciones de Tipos
	type IncidentStatusType = 'pendiente' | 'en_atencion' | 'resuelto';
	type Incident = (typeof mockIncidents)[0] & {
		estado: IncidentStatusType;
	};
	let incidents: Incident[] = [];
	let userRole: 'estudiante' | 'admin' | 'autoridad' | string | null = null;

	// Suscripción y Lógica de Carga de Datos
	auth.subscribe((value) => {
		userRole = value.user?.rol ?? null;
	});

	onMount(() => {
		incidents = mockIncidents as Incident[];
	});
</script>

<div class="flex h-screen bg-gray-900">
	<Header />

	<main class="flex-1 p-4 md:p-8">
		<div class="flex h-full w-full flex-col">
			<div class="mb-6 shrink-0"></div>

			<div class="w-full flex-grow">
				{#if userRole === 'estudiante'}
					<StudentChatView {incidents} />
				{:else if userRole}
					<AdminIncidentFeed {incidents} role={userRole} />
				{:else}
					<div class="flex-grow p-8">
						<h1 class="text-3xl font-bold text-white">Cargando...</h1>
					</div>
				{/if}
			</div>
		</div>
	</main>
</div>
