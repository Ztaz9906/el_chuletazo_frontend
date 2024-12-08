import { pedidosApi } from "@/servicios/redux/api/Pedidos/api.js";

const UpdateStatusEndpoint = pedidosApi.injectEndpoints({
  endpoints: (builder) => ({
    updateStatus: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `pedidos/${id}/update_status/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "Pedidos", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateStatusMutation } = UpdateStatusEndpoint;
