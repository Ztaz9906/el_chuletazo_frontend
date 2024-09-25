import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout.jsx";
import Login from "@/components/auth/login/Login.jsx";
import SingUp from "@/components/auth/sing-up/SingUp.jsx";
import Index from "@/components/home/Productos/index.jsx";
import LayoutPedidos from "@/components/home/pedidos/layout/layoutPedidos.jsx";
<<<<<<< HEAD
import ListaPedidosUsuarios from "@/components/home/pedidos/ListaPedidosUsuarios.jsx";
=======
import Main from "@/components/home/pedidos/Stepper/main.jsx";
>>>>>>> e9764a9c423ee9e6edbd9c0c087b7a71f6d42e59

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
<<<<<<< HEAD
    path: "lista_pedidos_usuarios",
    element: <ListaPedidosUsuarios />,
=======
    path: "stepper",
    element: <Main />,
>>>>>>> e9764a9c423ee9e6edbd9c0c087b7a71f6d42e59
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
