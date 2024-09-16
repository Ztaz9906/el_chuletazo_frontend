import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Importar jwt_decode como valor por defecto

//const baseUrl = process.env.REACT_APP_BACKEND_URL;
export const baseUrl = "https://autentication-system.vercel.app/api/";

const client = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de solicitudes
client.interceptors.request.use(
  async (config) => {
    const re_login = "/login/";
    const re_refresh = "/refresh/";
    let token = sessionStorage.getItem("token");

    // Solo añadimos el token en rutas que lo requieran
    if (
      config?.url.search(re_login) === -1 &&
      config?.url.search(re_refresh) === -1
    ) {
      const shouldRefresh = isRefreshNeeded(token);

      try {
        // Si el token necesita ser refrescado, hacer la petición de refresh
        if (token && shouldRefresh.needRefresh) {
          if (!shouldRefresh.valid) {
            const refreshToken = sessionStorage.getItem("refresh");
            const response = await client.post("/api/token/refresh/", {
              refresh: refreshToken,
            });

            // Guardar los nuevos tokens en sessionStorage
            token = response.data.access;
            sessionStorage.setItem("token", response.data.access);
            sessionStorage.setItem("refresh", response.data.refresh);
          }
        }
      } catch (e) {
        // Si el refresh falla, eliminar tokens y redirigir a la página de login
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refresh");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("institucion");

        window.location
          .replace(`${window.location.origin}/login`)
          .then(() => window.location.reload());
      }

      // Añadir el token al header Authorization si existe
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Función para verificar si el token necesita ser refrescado
export function isRefreshNeeded(token) {
  if (!token) {
    return { valid: false, needRefresh: true };
  }

  const decoded = jwtDecode(token);

  if (!decoded) {
    return { valid: false, needRefresh: true };
  }

  // Comprobar si el token ha expirado
  if (decoded.exp && Date.now() >= decoded.exp * 1000) {
    return { valid: false, needRefresh: true };
  }

  return { valid: true, needRefresh: false };
}

export default client;
