export { useGetPedidosQuery } from "@/servicios/redux/api/Pedidos/get/get.js";
export {
  useGetPedidoByIdQuery,
  useLazyGetPedidoByIdQuery,
} from "@/servicios/redux/api/Pedidos/get/getById.js";
export { useGetCheckOutQuery } from "@/servicios/redux/api/Pedidos/get/getCheckOut.js";
export { useCancelPedidoMutation } from "@/servicios/redux/api/Pedidos/patch/canelled";
export { usePatchPedidoMutation } from "@/servicios/redux/api/Pedidos/patch/patch.js";
export { useUpdateStatusMutation } from "@/servicios/redux/api/Pedidos/patch/status.js";
export { usePostPedidoMutation } from "@/servicios/redux/api/Pedidos/post/post.js";
