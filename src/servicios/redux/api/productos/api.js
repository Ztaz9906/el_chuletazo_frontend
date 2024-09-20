import { createApiSlice } from "@/servicios/redux/api/base/base.js";

export const api = createApiSlice({
  reducerPath: "api",
  tagTypes: ["Producto"],
});
