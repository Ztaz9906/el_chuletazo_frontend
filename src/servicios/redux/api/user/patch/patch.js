import { userApi } from "@/servicios/redux/api/user/api.js";

const userPatchEndpoint = userApi.injectEndpoints({
  endpoints: (builder) => ({
    patchUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `usuarios/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "User", id },
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { usePatchUserMutation } = userPatchEndpoint;
