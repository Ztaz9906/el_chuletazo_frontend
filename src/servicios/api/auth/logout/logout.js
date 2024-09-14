import {createApiSlice} from "@/servicios/api/base/base.js";
import {removeUser} from "@/servicios/redux/userSlice.js";

export const logoutApi = createApiSlice({
    reducerPath: 'logoutApi',
    tagTypes: ['Logout'],
});

const logoutEndpoint = logoutApi.injectEndpoints({
    endpoints: (builder) => ({
        Logout: builder.mutation({
            query: (logout) => ({
                url: "/api/logout/",
                method: "POST",
                body: logout,
            }),
            onQueryStarted: (arg, { dispatch, queryFulfilled }) => {
                queryFulfilled
                    .then(() => {
                        sessionStorage.removeItem("token");
                        sessionStorage.removeItem("refresh");
                        dispatch(removeUser());
                    })
                    .catch((error) => {
                        // Handle errors here if necessary
                        console.error(error);
                    });
            },
            invalidatesTags: [{ type: "Logout", id: "LIST" }],
        }),
    }),
    overrideExisting: false,
});

export const { useLogoutMutation } = logoutEndpoint;