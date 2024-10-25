import { pedidosApi } from "@/servicios/redux/api/Pedidos/api.js";

const pedidoGetEndpoint = pedidosApi.injectEndpoints({
  endpoints: (builder) => ({
    getCheckOut: builder.query({
      query: (id) => {
        let baseURL = `pedidos/${id}/retomar_checkout/`;
        return {
          url: baseURL,
          method: "GET",
        };
      },
      providesTags: (id) => [{ type: "Pedido", id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCheckOutQuery } = pedidoGetEndpoint;
