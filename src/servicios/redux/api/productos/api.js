import { createApiSlice } from "@/servicios/redux/api/base/base.js";

export const api = createApiSlice({
  reducerPath: "Productos",
  tagTypes: ["Producto"],
});
