import { configureStore } from "@reduxjs/toolkit";

import userReducer from "@/servicios/redux/slices/userSlice.js";
import { setupApiSlices } from "@/servicios/redux/api/api.js";
import cartReducer from "@/servicios/redux/slices/productSliece.js";
import { loadState, saveState } from "@/utils/localStorage.js";

const preloadedState = {
  cart: loadState() || { products: [] }, // Cargar el estado inicial del carrito desde localStorage
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    ...setupApiSlices.reducers,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    setupApiSlices.middleware(getDefaultMiddleware),
});
// Escuchar los cambios en el estado y guardarlos en localStorage
store.subscribe(() => {
  saveState(store.getState().cart);
});

export default store;
