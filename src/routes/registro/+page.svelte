<script>
	import Button from '$lib/components/ui/Button.svelte';
	import { goto } from '$app/navigation';

	// --- Variables para TODOS los campos del formulario ---
	let nombre = '';
	let codigo = '';
	let email = '';
	let password = '';
	let confirmPassword = '';

	// --- Variables de estado ---
	let error = '';
	let loading = false;

	async function handleRegister() {
		loading = true;
		error = '';

		if (password !== confirmPassword) {
			error = 'Las contraseñas no coinciden.';
			loading = false;
			return;
		}

		if (password.length < 8) {
			error = 'Contraseña de mínimo 8 caracteres';
			loading = false;
			return;
		}

		const REGISTER_API_URL = import.meta.env.VITE_API_REST_URL + '/register';

		try {
			const response = await fetch(REGISTER_API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					nombre: nombre,
					codigo: codigo,
					correo: email,
					password: password
				})
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.message || 'Error al crear la cuenta.';
				loading = false;
				return;
			}

			alert('¡Registro exitoso! Serás redirigido al Login.');
			goto('/');
		} catch (err) {
			console.error('Error de red:', err);
			error = 'No se pudo conectar al servidor.';
			loading = false;
		}
	}
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
		<img src="/logo1.png" alt="Logo UTEC" class="mx-auto mb-8 w-40" />

		<h2 class="mb-6 text-center text-3xl font-bold text-gray-900">Registro de Estudiante</h2>

		<form on:submit|preventDefault={handleRegister} class="space-y-5">
			<div class="space-y-1">
				<label for="nombre" class="block text-sm font-medium text-gray-700">
					Nombre Completo
				</label>
				<input
					id="nombre"
					type="text"
					required
					class="block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
					placeholder="Tu nombre"
					bind:value={nombre}
				/>
			</div>

			<div class="space-y-1">
				<label for="codigo" class="block text-sm font-medium text-gray-700">
					Código de Alumno
				</label>
				<input
					id="codigo"
					type="text"
					required
					class="block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
					placeholder="Ej: 202300123"
					bind:value={codigo}
				/>
			</div>
			<div class="space-y-1">
				<label for="email" class="block text-sm font-medium text-gray-700">
					Correo Institucional
				</label>
				<input
					id="email"
					type="email"
					required
					class="block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
					placeholder="ejemplo@utec.edu.pe"
					bind:value={email}
				/>
			</div>

			<div class="space-y-1">
				<label for="password" class="block text-sm font-medium text-gray-700">
					Crear Contraseña
				</label>
				<input
					id="password"
					type="password"
					required
					class="block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
					placeholder="••••••••"
					bind:value={password}
				/>
			</div>

			<div class="space-y-1">
				<label for="confirm-password" class="block text-sm font-medium text-gray-700">
					Confirmar Contraseña
				</label>
				<input
					id="confirm-password"
					type="password"
					required
					class="block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
					placeholder="••••••••"
					bind:value={confirmPassword}
				/>
			</div>

			{#if error}
				<p class="text-sm font-bold text-red-600">{error}</p>
			{/if}

			<div>
				<Button type="submit" disabled={loading}>
					{loading ? 'Creando cuenta...' : 'Crear Cuenta'}
				</Button>
			</div>
		</form>

		<p class="mt-8 text-center text-sm text-gray-600">
			¿Ya tienes una cuenta?
			<a href="/" class="font-medium text-blue-600 hover:text-blue-500"> Inicia sesión </a>
		</p>
	</div>
</div>

<style lang="postcss">
	@keyframes pulse-alert {
		0%,
		100% {
			transform: scale(1.3);
			opacity: 1;
		}
		50% {
			transform: scale(1.02);
			opacity: 0.95;
		}
	}

	.animate-pulse-alert {
		animation: pulse-alert 0.9s ease-in-out infinite;
	}
</style>
