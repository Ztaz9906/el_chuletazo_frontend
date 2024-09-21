import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        state.cart.push(product);
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.cart.find(item => item.id === id);
      if (product) {
        product.quantity = quantity;
      }
    },
    removeProduct: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter(item => item.id !== id);
    },
  },
});

export const { addProduct, updateQuantity, removeProduct } = productSlice.actions;
export default productSlice.reducer;