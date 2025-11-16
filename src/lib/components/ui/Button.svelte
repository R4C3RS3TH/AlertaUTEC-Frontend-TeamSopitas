<script>
	/** @type {'primary' | 'secondary'} */
	export let variant = 'primary';

	/** @type {"submit" | "button" | "reset" | undefined} */
	export let type = undefined;

	/** @type {boolean} */
	export let disabled = false;
</script>

<button
	{type}
	{disabled}
	class="w-full rounded-lg px-4 py-2 font-bold text-white shadow transition-colors
         {disabled
		? 'cursor-not-allowed bg-gray-400'
		: variant === 'primary'
			? 'bg-blue-600 hover:bg-blue-700'
			: 'bg-gray-600 hover:bg-gray-800'}"
	on:click
>
	<slot />
</button>
