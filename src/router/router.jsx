import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout.jsx";
import Login from "@/components/auth/login/Login.jsx";
import SingUp from "@/components/auth/sing-up/SingUp.jsx";
import Index from "@/components/home/Productos/index.jsx";
import LayoutPedidos from "@/components/home/pedidos/layout/layoutPedidos.jsx";
import ListaPedidosUsuarios from "@/components/home/pedidos/ListaPedidosUsuarios.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "productos",
        element: <Index />,
      },
    ],
  },
  {
    path: "pedidos",
    element: <LayoutPedidos />,
  },
  {
    path: "lista_pedidos_usuarios",
    element: <ListaPedidosUsuarios />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "sign-up",
    element: <SingUp />,
  },
]);

export default router;
