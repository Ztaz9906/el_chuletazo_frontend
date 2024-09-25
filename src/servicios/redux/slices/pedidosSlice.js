import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const pedidosSlice = createSlice({
  name: 'pedidos',
  initialState,
  reducers: {
    addPedido: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addPedido } = pedidosSlice.actions;
export default pedidosSlice.reducer;
