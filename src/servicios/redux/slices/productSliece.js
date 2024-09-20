// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id,
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id,
      );
    },
    editQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload.id,
      );

      if (product) {
        product.quantity = action.payload.quantity;
      }
    },
  },
});

// Exportar las acciones para usarlas en los componentes
export const { addProduct, deleteProduct, editQuantity } = cartSlice.actions;
// Exportar el reducer para integrarlo en el store
export default cartSlice.reducer;
