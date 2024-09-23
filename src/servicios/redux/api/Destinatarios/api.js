import { createApiSlice } from "@/servicios/redux/api/base/base.js";

export const destinatarioApi = createApiSlice({
  reducerPath: "destinatarios",
  tagTypes: ["Destinatario"],
});
