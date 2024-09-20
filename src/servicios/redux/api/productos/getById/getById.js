import { api } from "@/servicios/redux/api/productos/api.js";

const productoGetByIdEndpoint = api.injectEndpoints({
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
