// src/lib/stores/auth.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Definimos la forma de tu usuario (basada en el JWT de tu backend)
interface UserPayload {
    correo: string;
    rol: 'estudiante' | 'admin' | 'autoridad' | string; // 👈 CORRECCIÓN A 'rol'
    id: string;
    sub: string;
    codigo: string;
    nombre: string;
    area: string;
}

interface AuthState {
    user: UserPayload | null;
    token: string | null;
}

// Función que maneja Base64 URL Safe y valida la estructura
function decodeJwt(token: string): UserPayload | null {
    try {
        const parts = token.split('.');

        // --- 👇 AÑADIMOS VERIFICACIÓN ESTRUCTURAL 👇 ---
        if (parts.length !== 3) {
            console.error('❌ TOKEN FALLIDO: No es un JWT válido (faltan separadores ".").');
            return null;
        }

        const payloadBase64 = parts[1];

        // Decodificación URL Safe
        let standardBase64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
        while (standardBase64.length % 4) {
            standardBase64 += '=';
        }

        const decodedString = atob(standardBase64);
        const payload = JSON.parse(decodedString);

        // Verificación de que el campo 'rol' existe
        if (!payload.rol) {
            console.error('❌ TOKEN FALLIDO: El payload decodificado no contiene el campo "rol".');
            return null;
        }

        return payload as UserPayload;

    } catch (e) {
        // MUÉSTRAME ESTO SI FALLA AL INICIAR SESIÓN
        console.error('❌ ERROR CRÍTICO EN DECODIFICACIÓN (JSON o Base64):', e);
        return null;
    }
}

function createAuthStore() {
    const { subscribe, set } = writable<AuthState>({ user: null, token: null });

    return {
        subscribe,
        loadUser: () => {
            if (!browser) return;
            const token = localStorage.getItem('authToken');
            if (token) {
                const payload = decodeJwt(token);

                // --- 👇 LOG DE ÉXITO AÑADIDO AQUÍ 👇 ---
                if (payload) {
                    console.log("✅ STORE ACTUALIZADO. Rol encontrado:", payload.rol);
                }

                set({ user: payload, token: token });
            }
        },
        logout: () => {
            if (!browser) return;
            localStorage.removeItem('authToken');
            set({ user: null, token: null });
        }
    };
}

export const auth = createAuthStore();