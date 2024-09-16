import { userApi } from "@/servicios/api/user/api.js";

const userPostEndpoint = userApi.injectEndpoints({
  endpoints: (builder) => ({
    postUser: builder.mutation({
      query: (userData) => ({
        url: "usuarios/",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { usePostUserMutation } = userPostEndpoint;
