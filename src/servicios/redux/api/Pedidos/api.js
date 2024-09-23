import { createApiSlice } from "@/servicios/redux/api/base/base.js";

export const pedidosApi = createApiSlice({
  reducerPath: "pedidos",
  tagTypes: ["Pedidos"],
});
