import { createApiSlice } from "@/servicios/api/base/base.js";

export const userApi = createApiSlice({
  reducerPath: "userApi",
  tagTypes: ["User"],
});
