<script lang="ts">
	import { mockIncidents } from '$lib/mocks/incidents.js';
	import IncidentBubble from './IncidentBubble.svelte';
	import ChatInput from './ChatInput.svelte';
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/auth';

	// Definimos los tipos
	type IncidentStatusType = 'pendiente' | 'en_atencion' | 'resuelto';
	type Incident = (typeof mockIncidents)[0] & {
		estado: IncidentStatusType;
	};

	// 1. CAMBIO: Renombramos la prop. Esta es solo la lista INICIAL.
	let { incidents: initialIncidents = [] } = $props();

	// 2. CAMBIO: Creamos un ESTADO LOCAL para la lista "en vivo".
	// Usamos Svelte 5 $state para la reactividad.
	let liveIncidents = $state(initialIncidents);

	let ws: WebSocket | null = null;
	const WS_URL: string = import.meta.env.VITE_API_WS_URL;
	let isAuthenticated = $state(false);

	onMount(() => {
		console.log('Intentando conectar al servidor WebSocket...');
		ws = new WebSocket(WS_URL);

		ws.onopen = () => {
			console.log('¡Conectado exitosamente!');
			try {
				const authMessage = {
					action: 'authenticate',
					token: $auth.token
				};
				ws?.send(JSON.stringify(authMessage));
			} catch (error) {
				console.error('Error al enviar autenticación:', error);
			}
		};

		ws.onmessage = (event) => {
			const message = JSON.parse(event.data);
			console.log('Mensaje recibido, acción:', message.action);

			// 3. CAMBIO: ¡Flujo de lógica corregido!
			// Usamos un 'switch' para manejar las acciones de forma limpia.
			switch (message.action) {
				case 'auth-success':
					// 1. El servidor confirma que estamos autenticados.
					isAuthenticated = true;
					console.log('Autenticado. Solicitando lista de incidentes...');

					const suscribeMessage = {
						action: 'suscribe',
						view: 'view#main_list'
					};
					ws?.send(JSON.stringify(suscribeMessage));

					// 2. AHORA, solicitamos la lista (¡una sola vez!)
					const listMessage = {
						action: 'listarIncidencias',
						limit: 10
					};
					ws?.send(JSON.stringify(listMessage));
					break;

				case 'subscribe-success':
					console.log('Suscripción a la vista recibida:', message.view);
					break;

				case 'listarIncidenciasResponse':
					// 3. El servidor nos envía la lista que pedimos.
					console.log(`Recibidos ${message.incidencias.length} incidentes.`);
					console.log('Recibidos:', message.incidencias);
					// 4. CAMBIO: Actualizamos nuestro ESTADO LOCAL, no la prop.
					liveIncidents = message.incidencias;
					break;

				case 'IncidenteCreado':
					// 5. (Opcional) El servidor puede enviarnos un incidente nuevo
					console.log('Nuevo incidente recibido:', message.payload);
					const { creadoPor, urgencia, incidenciaId, tipo, descripcion, ubicacion } =
						message.payload;
					liveIncidents = [
						{
							id: incidenciaId,
							tipo,
							ubicacion,
							descripcion,
							urgencia,
							estado: 'en_atencion',
							creadoPor,
							fecha: Date.now().toString()
						},
						...liveIncidents
					];
					break;

				case 'actualizarIncidente':
					// 6. (Opcional) El servidor puede enviarnos una actualización
					console.log('Actualización de incidente:', message.data.id);
					liveIncidents = liveIncidents.map((inc) =>
						inc.id === message.data.id ? { ...inc, ...message.data } : inc
					);
					break;

				default:
					console.warn('Acción desconocida recibida:', message.action);
			}
		};

		ws.onerror = (error) => {
			console.error('Error de WebSocket:', error);
		};

		ws.onclose = () => {
			console.log('Desconectado del servidor WebSocket.');
			ws = null;
		};

		return () => {
			if (ws) {
				console.log('Cerrando conexión WebSocket...');
				ws.close();
			}
		};
	});
</script>

<div
	class="mx-auto flex h-full w-full max-w-xl flex-grow flex-col rounded-lg bg-gray-700 shadow-xl"
>
	<div class="flex-grow space-y-4 overflow-y-auto p-4">
		<!-- 5. CAMBIO: Usamos nuestro estado local 'liveIncidents' -->
		{#each liveIncidents as incident (incident)}
			<IncidentBubble {incident} />
		{/each}
	</div>

	<ChatInput />
</div>
