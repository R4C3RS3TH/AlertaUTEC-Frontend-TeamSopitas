<script>
	import Button from '$lib/components/ui/Button.svelte';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/stores/auth.ts';

	let email = '';
	let password = '';
	let error = '';
	let loading = false;

	const LOGIN_API_URL = import.meta.env.VITE_API_REST_URL + '/login';

	async function handleLogin() {
		loading = true;
		error = '';

		try {
			const response = await fetch(LOGIN_API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					correo: email,
					password: password
				})
			});

			// --- 👇 LÓGICA DE DIAGNÓSTICO (Si falla, leemos como texto) 👇 ---
			if (!response.ok) {
				// Leer la respuesta como texto/HTML para ver el error real del servidor o de API Gateway
				const errorText = await response.text();

				// 1. Mostrar el error en la consola
				console.error('SERVER ERROR (LEÍDO COMO TEXTO/HTML):', errorText);

				// 2. Mostrar un mensaje útil al usuario
				error =
					'Error de conexión: Verifica la consola para ver la respuesta del servidor (' +
					response.status +
					').';

				loading = false;
				return;
			}
			// --- 👆 FIN LÓGICA DE DIAGNÓSTICO 👆 ---

			const data = await response.json(); // Ahora esto solo se ejecuta si la respuesta es 200 OK

			if (data.token) {
				localStorage.setItem('authToken', data.token);
				auth.loadUser();
				// La redirección sucede con la reactividad
			} else {
				error = 'Error en el servidor: Token no recibido.';
			}
		} catch (err) {
			console.error('Error de red/timeout:', err);
			error = 'No se pudo conectar al servidor. Inténtalo más tarde.';
		}
		loading = false; // Asegurar que el loading se apague en cualquier caso de falla
	}

	// El bloque reactivo de redirección se queda igual
	$: if ($auth.token) {
		if (typeof window !== 'undefined' && window.location.pathname === '/') {
			goto('/dashboard');
		}
	}
</script>
