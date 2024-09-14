import {productoApi} from "@/servicios/api/productos/productoApi.js";


const productoDeleteEndpoint = productoApi.injectEndpoints({
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
