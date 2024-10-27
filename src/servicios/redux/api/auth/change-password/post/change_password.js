import { authApi } from "../../api";

const changePostEndpoint = authApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (data) => ({
        url: "change_password",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useChangePasswordMutation } = changePostEndpoint;
