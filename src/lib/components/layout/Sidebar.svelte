<script lang="ts">
	import { auth } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	function handleLogout() {
		auth.logout();
		goto('/');
	}

	const isActive = (path: string) => $page.url.pathname.startsWith(path);
</script>

<aside class="flex h-screen w-64 flex-col justify-between bg-gray-900 p-4 shadow-2xl">
	<div>
		<div class="mb-8 flex flex-col items-center justify-center border-b border-gray-700 pb-4">
			<img src="/logo.png" alt="Logo UTEC" class="h-20 w-auto" />
			<span class="animate-pulse-alert mt-2 text-2xl font-extrabold text-white"> Alerta UTEC </span>
		</div>

		<nav class="space-y-1">
			<a
				href="/dashboard"
				class="flex items-center rounded-md p-3 text-sm font-medium transition-colors
                {isActive('/dashboard')
					? 'bg-blue-600 text-white shadow-md'
					: 'text-gray-300 hover:bg-gray-700'}"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mr-3 h-5 w-5 {isActive('/dashboard') ? 'text-white' : 'text-gray-400'}"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z"
					/>
				</svg>
				<span>Chat General</span>
			</a>

			{#if $auth.user?.rol === 'admin' || $auth.user?.rol === 'autoridad'}
				<a
					href="/admin/dashboard"
					class="flex items-center rounded-lg p-3 text-sm font-medium transition-colors
                    {isActive('/admin/dashboard')
						? 'bg-blue-600 text-white shadow-md'
						: 'text-gray-300 hover:bg-gray-700'}"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-3 h-5 w-5 {isActive('/admin/dashboard') ? 'text-white' : 'text-gray-400'}"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
					<span>Panel Administrativo</span>
				</a>
			{/if}
		</nav>
	</div>

	<div class="border-t border-gray-700 pt-4">
		{#if $auth.user}
			<div class="mb-3">
				<p class="text-xs font-medium text-gray-400">Conectado como:</p>
				<strong class="block text-sm font-semibold break-words text-white">
					{$auth.user.correo}
				</strong>
			</div>

			<button
				on:click={handleLogout}
				class="flex w-full items-center text-left text-xs font-medium text-red-400 hover:underline"
			>
				<span class="mr-1">❌</span>
				Cerrar Sesión
			</button>
		{/if}
	</div>
</aside>

<style lang="postcss">
	@keyframes pulse-alert {
		0%,
		100% {
			transform: scale(1.2);
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
