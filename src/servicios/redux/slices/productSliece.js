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
      console.log("Adding product:", action.payload);
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id,
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        console.log("Adding new product to cart:", action.payload);
        state.products.push(action.payload);
      }
    },
    deleteProduct: (state, action) => {
      console.log("Deleting product:", action.payload);
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
      console.log(state.products);
    },
    editQuantity: (state, action) => {
      console.log(state, action.payload);
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
