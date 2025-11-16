<script>
	import { createEventDispatcher } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';

	const dispatch = createEventDispatcher();

	let formData = {
		tipo: 'Infraestructura',
		ubicacion: '',
		descripcion: '',
		urgencia: 'baja'
	};

	function handleSubmit() {
		// Aquí, en lugar de llamar a una API,
		// notificamos a la página "padre" que el formulario se envió.
		dispatch('submitIncident', formData);

		// Opcional: limpiar formulario
		// formData = { ... };
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
	<div>
		<label for="tipo" class="block text-sm font-medium text-gray-700">Tipo de Incidente</label>
		<select id="tipo" bind:value={formData.tipo} class="w-full rounded border p-2">
			<option>Infraestructura</option>
			<option>Servicios</option>
			<option>Limpieza</option>
			<option>Seguridad</option>
			<option>Otro</option>
		</select>
	</div>

	<div>
		<label for="ubicacion" class="block text-sm font-medium text-gray-700"
			>Ubicación (Ej: Lab B302)</label
		>
		<input
			type="text"
			id="ubicacion"
			bind:value={formData.ubicacion}
			class="w-full rounded border p-2"
			required
		/>
	</div>

	<div>
		<label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción</label>
		<textarea
			id="descripcion"
			rows="4"
			bind:value={formData.descripcion}
			class="w-full rounded border p-2"
			required
		></textarea>
	</div>

	<div>
		<label class="block text-sm font-medium text-gray-700">Nivel de Urgencia</label>
		<div class="flex gap-4">
			<label><input type="radio" bind:group={formData.urgencia} value="baja" /> Baja</label>
			<label><input type="radio" bind:group={formData.urgencia} value="media" /> Media</label>
			<label><input type="radio" bind:group={formData.urgencia} value="alta" /> Alta</label>
		</div>
	</div>

	<button type="submit" class="rounded bg-blue-600 px-4 py-2 text-white">Reportar Incidente</button>
</form>
