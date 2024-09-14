import { createApiSlice } from "@/servicios/api/base/base.js";

export const productoApi = createApiSlice({
    reducerPath: "productoApi",
    tagTypes: ["Producto"],
});