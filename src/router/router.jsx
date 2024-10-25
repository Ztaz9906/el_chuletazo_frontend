import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout.jsx";
import Login from "@/components/auth/login/Login.jsx";
import SingUp from "@/components/auth/sing-up/SingUp.jsx";
import Index from "@/components/home/Productos/index.jsx";
import LayoutPedidos from "@/components/home/pedidos/layout/layoutPedidos.jsx";
import MainStepper from "@/components/home/pedidos/Stepper/MainStepper.jsx";
import ListaPedidos from "@/components/home/pedidos/table/ListaPedidos.jsx";
import LayOutConfiguracion from "@/components/home/configuration/Layout/LayOutConfiguracion";
import ListaDestinatarios from "@/components/home/configuration/destinatarios/Table/ListaDestinatarios";
import InfoPagos from "@/components/home/pagos/pagos.jsx";
import InfoEnvios from "@/components/home/envíos/envios";
import InfoPreguntasFrecuentes from "@/components/home/preguntas_frecuentes/preguntas_frecuentes";

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
        path: "info_pagos",
        element: <InfoPagos />,
      },
      {
        path: "info_envios",
        element: <InfoEnvios />,
      },
      {
        path: "info_preguntas-frecuentes",
        element: <InfoPreguntasFrecuentes />,
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
    path:'configuracion',
    element:<LayOutConfiguracion/>,
    children: [
      {
        path: "destinatarios",
        element: <ListaDestinatarios/>, 
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
