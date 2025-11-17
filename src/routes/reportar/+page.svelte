<script lang="ts">
	import Header from '$lib/components/layout/Sidebar.svelte'; // Usamos la Sidebar para navegación
	import Button from '$lib/components/ui/Button.svelte';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/stores/auth';
	import { onMount, onDestroy } from 'svelte';

	// Variables para el formulario (nomenclatura del backend: categoria, urgencia)
	let categoria = 'Infraestructura';
	let ubicacion = '';
	let descripcion = '';
	let urgencia = 'bajo'; // Valores para el backend: bajo, medio, alto

	let error = '';
	let loading = false;
	let ws: WebSocket | null = null;
	let isConnected = false;

	// URL de WebSocket (de tus variables de entorno)
	const WS_API_URL = import.meta.env.VITE_API_WS_URL;

	// Token de autenticación
	let authToken: string | null = null;
	auth.subscribe((value) => {
		authToken = value.token;
	});

	// --- GESTIÓN DE LA CONEXIÓN WEBSOCKET ---
	onMount(() => {
		if (!authToken || !WS_API_URL) {
			error = 'Error de autenticación o configuración.';
			return;
		}

		ws = new WebSocket(`${WS_API_URL}?token=${authToken}`);

		ws.onopen = () => {
			console.log('✅ WebSocket conectado para reportar incidentes.');
			isConnected = true;
			error = '';
		};

		ws.onerror = (e) => {
			console.error('❌ WebSocket Error:', e);
			error = 'Fallo en la conexión de tiempo real.';
		};

		ws.onmessage = (event) => {
			const response = JSON.parse(event.data);
			if (response.action === 'crearIncidenteSuccess') {
				alert('¡Reporte enviado con éxito! ID: ' + response.incidenciaId);
				goto('/dashboard'); // Redirige al dashboard
			}
			if (response.action === 'error') {
				error = response.message || 'Error desconocido al reportar.';
				loading = false;
			}
		};
	});

	// Aseguramos que el socket se cierre al salir de la página
	onDestroy(() => {
		if (ws) {
			ws.close();
		}
	});
	// --- FUNCIÓN DE ENVÍO DE DATOS (Conexión a la API) ---
	async function handleSubmit() {
		loading = true;
		error = '';

		if (!ws || ws.readyState !== WebSocket.OPEN) {
			error = 'La conexión WebSocket no está lista. Espera un momento.';
			loading = false;
			return;
		}

		// Prepara el mensaje que espera la Lambda
		const message = {
			action: 'crearIncidente',
			data: {
				categoria, // Coincide con el backend
				ubicacion,
				descripcion,
				urgencia // Coincide con el backend
			}
		};

		try {
			ws.send(JSON.stringify(message));
		} catch (err) {
			console.error('Error al enviar WS:', err);
			error = 'Fallo al enviar mensaje WebSocket.';
			loading = false;
		}
	}
</script>

<div class="flex h-screen bg-gray-900">
	<Header />

	<main class="flex flex-1 items-center justify-center overflow-y-auto bg-gray-800 p-4 md:p-8">
		<div class="mx-auto max-w-2xl rounded-lg bg-gray-100 p-8 shadow-lg">
			<a
				href="/dashboard"
				class="mb-6 flex items-center gap-2 text-lg font-medium text-blue-600 transition-colors hover:text-blue-700"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
				</svg>
				Volver a Chat General
			</a>

			<h1 class="mb-2 text-3xl font-bold text-gray-900">Reportar un Incidente</h1>

			<p class="mb-6 text-sm text-gray-600">
				Describe el problema y será asignado automáticamente al área responsable.
			</p>

			{#if !isConnected}
				<div class="mb-4 text-sm font-medium text-orange-600">
					Conectando a tiempo real... (Verifica la consola)
				</div>
			{/if}

			<form on:submit|preventDefault={handleSubmit} class="space-y-6">
				<div>
					<label for="categoria" class="block text-sm font-medium text-gray-700"
						>Categoría / Área de Asignación</label
					>

					<select
						id="categoria"
						bind:value={categoria}
						class="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm"
					>
						<option value="Infraestructura">Infraestructura </option>
						<option value="Salud">Salud </option>
						<option value="Seguridad">Seguridad </option>
						<option value="Limpieza y Orden">Limpieza y Orden </option>
						<option value="Tecnologia">Tecnología </option>
						<option value="Otros">Otros </option>
					</select>
				</div>

				<div>
					<label for="ubicacion" class="block text-sm font-medium text-gray-700"
						>Ubicación (Ej: Lab B302, Baño Piso 3)</label
					>
					<input
						type="text"
						id="ubicacion"
						bind:value={ubicacion}
						class="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm"
						required
					/>
				</div>

				<div>
					<label for="descripcion" class="block text-sm font-medium text-gray-700"
						>Descripción (¿Qué está pasando?)</label
					>
					<textarea
						id="descripcion"
						rows="4"
						bind:value={descripcion}
						class="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm"
						required
					></textarea>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700">Nivel de Urgencia</label>
					<div class="mt-2 flex gap-6">
						<label class="flex items-center gap-2">
							<input type="radio" bind:group={urgencia} value="bajo" class="h-4 w-4" /> Bajo
						</label>
						<label class="flex items-center gap-2">
							<input type="radio" bind:group={urgencia} value="medio" class="h-4 w-4" /> Medio
						</label>
						<label class="flex items-center gap-2">
							<input type="radio" bind:group={urgencia} value="alto" class="h-4 w-4" /> Alto
						</label>
					</div>
				</div>

				{#if error}
					<p class="text-sm font-bold text-red-600">{error}</p>
				{/if}

				<div class="pt-4">
					<Button type="submit" disabled={loading || !isConnected}>
						{loading ? 'Enviando...' : 'Enviar Reporte'}
					</Button>
				</div>
			</form>
		</div>
	</main>
</div>
