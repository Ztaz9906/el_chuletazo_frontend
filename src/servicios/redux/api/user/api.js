import { createApiSlice } from "@/servicios/redux/api/base/base.js";

export const userApi = createApiSlice({
  reducerPath: "userApi",
  tagTypes: ["User"],
});
