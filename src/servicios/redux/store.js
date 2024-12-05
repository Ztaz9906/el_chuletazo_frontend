import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/servicios/redux/slices/userSlice.js";
import { setupApiSlices } from "@/servicios/redux/api/api.js";
import cartReducer from "@/servicios/redux/slices/productSliece.js";
import { loadState, saveState } from "@/utils/localStorage.js";

const preloadedState = {
  cart: loadState() || { products: [] },
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

store.subscribe(() => {
  saveState(store.getState().cart);
});

export default store;

//Voy a guardar todos los endpoints creados, cada uno se crea con reduser