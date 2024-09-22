import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout.jsx";
import Login from "@/components/auth/login/Login.jsx";
import SingUp from "@/components/auth/sing-up/SingUp.jsx";
import Index from "@/components/home/Productos/index.jsx";
import CreatePedido from "@/components/home/pedidos/CreatePedido.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "productos",
        element: <Index />,
      },
      {
        path: "pedidos",
        element: <CreatePedido />,
      },
    ],
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
