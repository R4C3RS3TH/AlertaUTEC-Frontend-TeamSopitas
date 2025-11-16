<script>
	// Esta es tu página principal (homepage)
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8 text-center">
	<img src="/logo.png" alt="Logo UTEC" class="mb-8 w-48" />

	<h1 class="mb-4 text-4xl font-bold text-gray-900">Bienvenido a Alerta UTEC</h1>
	<p class="mb-12 text-xl text-gray-600">Plataforma de reporte de incidentes del campus.</p>

	<div class="flex w-full max-w-xs flex-col gap-4 sm:flex-row">
		<a
			href="/reportar"
			class="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
		>
			Reportar un Incidente
		</a>

		<a
			href="/admin/dashboard"
			class="w-full rounded-lg bg-gray-700 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-gray-800"
		>
			Panel Admin (Simulación)
		</a>
	</div>
</div>
