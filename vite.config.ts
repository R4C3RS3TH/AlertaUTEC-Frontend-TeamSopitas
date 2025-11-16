// vite.config.ts
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],

	// 👇 AÑADIMOS ESTA CONFIGURACIÓN DE BUILD 👇
	build: {
		// Desactiva la generación de manifiesto SSR (lado del servidor)
		ssrManifest: false,
		// Establece un límite de tamaño de fragmento para evitar que Vite se cuelgue
		chunkSizeWarningLimit: 1500
	}
});