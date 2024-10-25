import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Importar jwt_decode como valor por defecto

const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
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
            const response = await client.post("/token/refresh/", {
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
  }
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Ocurrió un error inesperado";

    if (error.response) {
      console.log(error.response);
      const { data, status } = error.response;

      if (typeof data === "string") {
        message = data;
      } else if (typeof data === "object") {
        if (data.detail) {
          message = data.detail;
        } else if (data.non_field_errors) {
          message = data.non_field_errors[0];
        } else if (data.message) {
          message = data.message;
        } else if (data.error) {
          message = data.error;
        } else {
          message = Object.entries(data)
            .map(([key, value]) => `${key}: ${value}`)
            .join(". ");
          console.log(message);
        }
      }

      error.status = status;
    } else if (error.request) {
      message = "No se pudo conectar con el servidor";
    } else {
      message = error.message;
    }

    error.message = message;
    return Promise.reject(error);
  }
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
