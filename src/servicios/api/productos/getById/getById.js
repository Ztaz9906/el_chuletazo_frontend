import {productoApi} from "@/servicios/api/productos/productoApi.js";

const productoGetByIdEndpoint = productoApi.injectEndpoints({
    endpoints: (builder) => ({
        getProductoById: builder.query({
            query: (id) => ({
                url: `productos/${id}/`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Producto", id }],
        }),
    }),
    overrideExisting: false,
});

export const { useGetProductoByIdQuery } = productoGetByIdEndpoint;
