// Export individual APIs
import { loginApi } from "@/servicios/api/auth/login/login.js";
import { logoutApi } from "@/servicios/api/auth/logout/logout.js";
import { productoApi } from "@/servicios/api/productos/productoApi.js";
import { userApi } from "@/servicios/api/user/api.js";

// Collect all API slices
export const apiSlices = [loginApi, logoutApi, productoApi, userApi];

// You want to create a helper for easier store setup
export const setupApiSlices = {
  reducers: apiSlices.reduce((acc, api) => {
    acc[api.reducerPath] = api.reducer;
    return acc;
  }, {}),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlices.map((api) => api.middleware)),
};
