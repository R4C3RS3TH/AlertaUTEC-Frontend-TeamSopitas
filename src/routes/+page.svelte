<script>
	import Button from '$lib/components/ui/Button.svelte';
	import { goto } from '$app/navigation';
	// 👇 NECESITAMOS IMPORTAR EL STORE PARA PODER USAR '$auth'
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

			const data = await response.json();

			if (!response.ok) {
				error = data.message || 'Credenciales inválidas.';
				loading = false;
				return;
			}

			const token = data.token;

			if (token) {
				// 1. Guardamos el token
				localStorage.setItem('authToken', token);

				// 2. FORZAMOS LA CARGA DEL STORE (Esto activa el bloque '$: if ($auth.token)')
				auth.loadUser();

				// 3. QUITAMOS EL GOTO Y EL TIMEOUT. El bloque reactivo hará la redirección.
			} else {
				error = 'Error en el servidor: Token no recibido.';
				loading = false;
			}
		} catch (err) {
			console.error('Error de red:', err);
			error = 'No se pudo conectar al servidor. Inténtalo más tarde.';
			loading = false;
		}
	}

	// --- 👇 SOLUCIÓN DEFINITIVA AL CONFLICTO DE TIEMPO 👇 ---
	// Svelte ejecutará esto automáticamente cada vez que el valor de $auth.token cambie.
	// Esto garantiza que la redirección sea el último paso reactivo.
	$: if ($auth.token) {
		// Solo redirige si estamos en la página de login (la raíz /)
		if (typeof window !== 'undefined' && window.location.pathname === '/') {
			goto('/dashboard');
		}
	}
	// --- ----------------------------------------------- ---
</script>

<div
	class="flex min-h-screen flex-col items-center justify-center bg-cover bg-center px-4 py-8"
	style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/fondo.jpg')"
>
	<h1 class="animate-pulse-alert mb-1 text-center text-6xl font-extrabold text-white">
		Alerta UTEC
	</h1>
	<p class="mb-10 text-center text-lg text-gray-200">Plataforma de gestión de incidentes</p>

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

<style lang="postcss">
	@keyframes pulse-alert {
		0%,
		100% {
			transform: scale(1.4);
			opacity: 1;
		}
		50% {
			transform: scale(1.02);
			opacity: 0.95;
		}
	}

	.animate-pulse-alert {
		animation: pulse-alert 1s ease-in-out infinite;
	}
</style>
