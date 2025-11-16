<script>
	import Button from '$lib/components/ui/Button.svelte';
	import { goto } from '$app/navigation'; // Para redirigir

	// Variables para el formulario
	let email = '';
	let password = '';
	let error = '';
	let loading = false;

	// --- FUNCIÓN DE LOGIN (SIN NADA DE 'AnimatedBackground') ---
	async function handleLogin() {
		loading = true;
		error = '';

		// URL del endpoint que tus compañeros crearán en API Gateway
		const LOGIN_API_URL = 'https://tu-api-gateway.com/prod/login'; // <-- URL de ejemplo

		try {
			const response = await fetch(LOGIN_API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password
				})
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.message || 'Credenciales incorrectas.';
				loading = false;
				return;
			}

			if (data.token) {
				localStorage.setItem('authToken', data.token);
				goto('/dashboard');
			} else {
				error = 'No se recibió un token del servidor.';
			}
		} catch (err) {
			console.error('Error de red:', err);
			error = 'No se pudo conectar al servidor. Inténtalo más tarde.';
			loading = false;
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100 px-4">
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
		<img src="/logo.png" alt="Logo UTEC" class="mx-auto mb-8 w-40" />

		<h2 class="mb-6 text-center text-3xl font-bold text-gray-900">Iniciar Sesión</h2>

		<form on:submit|preventDefault={handleLogin} class="space-y-6">
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700">
					Correo Institucional
				</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					placeholder="ejemplo@utec.edu.pe"
					bind:value={email}
				/>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-gray-700"> Contraseña </label>
				<input
					id="password"
					name="password"
					type="password"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					placeholder="••••••••"
					bind:value={password}
				/>
			</div>

			{#if error}
				<p class="text-sm font-bold text-red-600">{error}</p>
			{/if}

			<div>
				<Button type="submit" disabled={loading}>
					{loading ? 'Ingresando...' : 'Ingresar'}
				</Button>
			</div>
		</form>

		<p class="mt-8 text-center text-sm text-gray-600">
			¿Eres estudiante y no tienes cuenta?
			<a href="/registro" class="font-medium text-blue-600 hover:text-blue-500">
				Regístrate aquí
			</a>
		</p>
	</div>
</div>
