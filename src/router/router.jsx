import Layout from "@/components/Layout.jsx";
import Login from "@/components/auth/login/Login.jsx";
import SingUp from "@/components/auth/sing-up/SingUp.jsx";
import Index from "@/components/home/Productos/index.jsx";
import LayOutConfiguracion from "@/components/home/configuration/Layout/LayOutConfiguracion";
import ListaDestinatarios from "@/components/home/configuration/destinatarios/Table/ListaDestinatarios";
import MainStepper from "@/components/home/pedidos/Stepper/MainStepper.jsx";
import LayoutPedidos from "@/components/home/pedidos/layout/layoutPedidos.jsx";
import ListaPedidos from "@/components/home/pedidos/table/ListaPedidos.jsx";
import { createBrowserRouter } from "react-router-dom";
import ProductLayout from "../components/home/Productos/ProductLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "productos",
    element: <ProductLayout />,
    children: [
      {
        path: "",
        element: <Index />,
      },
    ],
  },
  {
    path: "pedidos",
    element: <LayoutPedidos />, // Ahora "pedidos" tiene un path explícito
    children: [
      {
        path: "",
        element: <ListaPedidos />, // Esta será la ruta /pedidos
      },
      {
        path: "confirmar_pedido",
        element: <MainStepper />, // Esta será la ruta /pedidos/confirmar_pedido
      },
    ],
  },
  {
    path: "configuracion",
    element: <LayOutConfiguracion />,
    children: [
      {
        path: "destinatarios",
        element: <ListaDestinatarios />,
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
