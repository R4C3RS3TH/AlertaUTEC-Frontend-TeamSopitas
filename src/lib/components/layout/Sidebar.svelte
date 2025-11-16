<script lang="ts">
	import { auth } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores'; // Para saber qué página está activa

	function handleLogout() {
		auth.logout();
		goto('/'); // Envía al usuario de vuelta al Login
	}
</script>

<aside class="flex h-screen w-64 flex-col justify-between border-r bg-white p-4 shadow-xl">
	<div>
		<div class="mb-6 flex flex-col items-center justify-center border-b pb-4">
			<img src="/logo.png" alt="Logo UTEC" class="h-10 w-auto" />
			<span class="mt-2 text-xs font-semibold text-gray-500">Alerta UTEC</span>
		</div>

		<nav class="space-y-2">
			<a
				href="/dashboard"
				class="flex items-center rounded-lg p-3 text-sm font-medium transition-colors
                {$page.url.pathname === '/dashboard'
					? 'bg-blue-500 text-white shadow-md'
					: 'text-gray-700 hover:bg-gray-100'}"
			>
				<span class="ml-3">💬 Mis Incidentes</span>
			</a>

			<a
				href="/reportar"
				class="flex items-center rounded-lg p-3 text-sm font-medium transition-colors
                {$page.url.pathname === '/reportar'
					? 'bg-blue-500 text-white shadow-md'
					: 'text-gray-700 hover:bg-gray-100'}"
			>
				<span class="ml-3">🚨 Nuevo Reporte</span>
			</a>

			{#if $auth.user?.rol === 'admin' || $auth.user?.rol === 'autoridad'}
				<a
					href="/admin/dashboard"
					class="flex items-center rounded-lg p-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
				>
					<span class="ml-3">📊 Panel Administrativo</span>
				</a>
			{/if}
		</nav>
	</div>

	<div class="border-t pt-4">
		{#if $auth.user}
			<div class="mb-2 text-sm text-gray-700">
				Conectado como: <br />
				<strong class="text-xs text-blue-600">{$auth.user.email}</strong>
			</div>
			<button on:click={handleLogout} class="text-xs font-medium text-red-600 hover:underline">
				Cerrar Sesión
			</button>
		{/if}
	</div>
</aside>
