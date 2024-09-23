import { pedidosApi } from "@/servicios/redux/api/Pedidos/api.js";

const pedidoPostEndpoint = pedidosApi.injectEndpoints({
  endpoints: (builder) => ({
    postPedido: builder.mutation({
      query: (data) => ({
        url: "pedidos/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "pedido", id: "create" }],
    }),
  }),
  overrideExisting: false,
});

export const { usePostPedidoMutation } = pedidoPostEndpoint;
