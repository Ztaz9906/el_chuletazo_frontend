import { pedidosApi } from "@/servicios/redux/api/Pedidos/api.js";

const patchPedidoEndpoint = pedidosApi.injectEndpoints({
  endpoints: (builder) => ({
    patchPedido: builder.mutation({
      query: (id, data) => ({
        url: `pedidos/${id}/`,
        method: "PATCH",
        body: data,
      }),
      providesTags: (result, error, id) => [{ type: "Pedido", id }],
    }),
  }),
  overrideExisting: false,
});

export const { usePatchPedidoMutation } = patchPedidoEndpoint;
