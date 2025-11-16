<script>
	import Button from '$lib/components/ui/Button.svelte';

	function handleRegister() {
		// En el futuro, aquí también se enviaría el código de alumno
		console.log('Simulando registro de estudiante...');
		alert('Simulación de registro exitoso! (Revisa la consola)');
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12">
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
		<img src="/logo.png" alt="Logo UTEC" class="mx-auto mb-8 w-40" />

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
				/>
			</div>

			<div>
				<Button type="submit">Crear Cuenta</Button>
			</div>
		</form>

		<p class="mt-8 text-center text-sm text-gray-600">
			¿Ya tienes una cuenta?
			<a href="/" class="font-medium text-blue-600 hover:text-blue-500"> Inicia sesión </a>
		</p>
	</div>
</div>
