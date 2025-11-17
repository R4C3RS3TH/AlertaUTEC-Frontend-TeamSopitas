# AlertaUTEC Frontend — Team Sopitas

**AlertaUTEC** es la aplicación frontend desarrollada por **Team Sopitas** para gestionar alertas dentro de la comunidad UTEC.  
Permite a los usuarios reportar incidentes, visualizar alertas activas y acceder a información relevante de seguridad.

---

## 📚 Tecnologías utilizadas

- **Svelte / SvelteKit**
- **Vite**
- **TypeScript** (si aplica)
- **TailwindCSS**
- **ESLint + Prettier**

---

## ⚙️ Configuración de entorno

Para ejecutar el proyecto correctamente, debes crear un archivo **.env.local** en la raíz del proyecto con las siguientes variables:

```bash
# .env.local
# Variables de entorno para el desarrollo local (localhost)

# 1. API REST (Para Login, Registro, etc.)
VITE_API_REST_URL="https://po640jyce6.execute-api.us-east-1.amazonaws.com/"

# 2. API WebSocket (Para comunicación en tiempo real/chat)
VITE_API_WS_URL="wss://w5fzfgzq43.execute-api.us-east-1.amazonaws.com/dev"
