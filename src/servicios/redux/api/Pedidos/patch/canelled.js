import { pedidosApi } from "@/servicios/redux/api/Pedidos/api.js";

const cancelPedidoEndpoint = pedidosApi.injectEndpoints({
  endpoints: (builder) => ({
    cancelPedido: builder.mutation({
      query: (id) => ({
        url: `pedidos/${id}/cancelar/`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Pedidos", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useCancelPedidoMutation } = cancelPedidoEndpoint;
