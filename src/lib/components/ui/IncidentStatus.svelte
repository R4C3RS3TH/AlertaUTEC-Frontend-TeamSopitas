<script>
	/** @type {'pendiente' | 'en_atencion' | 'resuelto'} */
	export let status = 'pendiente';

	const statusMap = {
		pendiente: {
			text: 'Pendiente',
			color: 'bg-yellow-200 text-yellow-900'
		},
		en_atencion: {
			text: 'En Atención',
			color: 'bg-blue-300 text-blue-900'
		},
		resuelto: {
			text: 'Resuelto',
			color: 'bg-green-300 text-green-900'
		}
	};

	$: current = statusMap[status] || statusMap.pendiente;
</script>

<span class="rounded-full px-3 py-1 text-xs font-semibold {current.color}">
	{current.text}
</span>
