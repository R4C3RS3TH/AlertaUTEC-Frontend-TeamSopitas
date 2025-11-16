// svelte.config.js
import adapter from '@sveltejs/adapter-static'; // <-- CAMBIO AQUÍ

// ... resto de imports ...

const config = {
	// ...
	kit: {
		// Reemplaza @sveltejs/adapter-auto por el adaptador estático
		adapter: adapter({
			// Esto asegura que se construyan archivos HTML completos para cada ruta
			fallback: 'index.html' // Necesario para el enrutamiento de SvelteKit en hosting estático
		})
	}
};

export default config;