// Export individual APIs

// Collect all API slices
import { loginApi } from "@/servicios/redux/api/auth/login/login.js";
import { logoutApi } from "@/servicios/redux/api/auth/logout/logout.js";
import { api } from "@/servicios/redux/api/productos/api.js";
import { userApi } from "@/servicios/redux/api/user/api.js";
import { destinatarioApi } from "@/servicios/redux/api/Destinatarios/api.js";
import { provinciaApi } from "@/servicios/redux/api/nomencladores/Provincias/api.js";
import { pedidosApi } from "@/servicios/redux/api/Pedidos/api.js";

export const apiSlices = [
  loginApi,
  logoutApi,
  api,
  userApi,
  destinatarioApi,
  provinciaApi,
  pedidosApi,
];

// You want to create a helper for easier store setup
export const setupApiSlices = {
  reducers: apiSlices.reduce((acc, api) => {
    acc[api.reducerPath] = api.reducer;
    return acc;
  }, {}),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlices.map((api) => api.middleware)),
};
