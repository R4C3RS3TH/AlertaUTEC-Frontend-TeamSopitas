<script lang="ts">
	// 1. Importa el CSS global
	import '../app.css';

	// --- 👇 AÑADE ESTAS LÍNEAS ---
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/auth'; // Asegúrate que la ruta a tu store sea correcta

	// 'onMount' solo se ejecuta en el NAVEGADOR
	onMount(() => {
		// 2. Añade un log para depurar
		console.log('Layout montado. Intentando cargar usuario...');

		// 3. Llama a la función para leer el localStorage
		auth.loadUser();
	});
	// --- -------------------- ---
</script>

<slot />
