import { pedidosApi } from "@/servicios/redux/api/Pedidos/api.js";

const pedidoGetEndpoint = pedidosApi.injectEndpoints({
  endpoints: (builder) => ({
    getPedidoById: builder.query({
      query: (id, filters) => {
        let baseURL = `pedidos/${id}/`;
        let queryStrings = [];
        for (let key in filters) {
          if (filters[key] && filters[key] !== "") {
            queryStrings.push(`${key}=${filters[key]}`);
          }
        }
        return {
          url:
            baseURL + (queryStrings.length ? `?${queryStrings.join("&")}` : ""),
          method: "GET",
        };
      },
      providesTags: (id) => [{ type: "Pedido", id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPedidoByIdQuery, useLazyGetPedidoByIdQuery } =
  pedidoGetEndpoint;
