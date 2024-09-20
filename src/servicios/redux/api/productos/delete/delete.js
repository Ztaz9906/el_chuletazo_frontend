import { api } from "@/servicios/redux/api/productos/api.js";

const productoDeleteEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    deleteProducto: builder.mutation({
      query: (id) => ({
        url: `productos/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Producto", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useDeleteProductoMutation } = productoDeleteEndpoint;
