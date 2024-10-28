import Layout from "@/components/Layout.jsx";
import Login from "@/components/auth/login/Login.jsx";
import SingUp from "@/components/auth/sing-up/SingUp.jsx";
import Index from "@/components/home/Productos/index.jsx";
import LayOutConfiguracion from "@/components/home/configuration/Layout/LayOutConfiguracion";
import ListaDestinatarios from "@/components/home/configuration/destinatarios/Table/ListaDestinatarios";
import InfoEnvios from "@/components/home/envíos/envios";
import InfoPagos from "@/components/home/pagos/pagos.jsx";
import MainStepper from "@/components/home/pedidos/Stepper/MainStepper.jsx";
import LayoutPedidos from "@/components/home/pedidos/layout/layoutPedidos.jsx";
import ListaPedidos from "@/components/home/pedidos/table/ListaPedidos.jsx";
import InfoPreguntasFrecuentes from "@/components/home/preguntas_frecuentes/preguntas_frecuentes";
import { createBrowserRouter } from "react-router-dom";
import Activate from "../components/auth/activate/Activate";
import ChangePassword from "../components/home/configuration/change_password/ChangePassword";
import DatosPersonales from "../components/home/configuration/datos_personales/DatosPersonales";
import Details from "../components/home/pedidos/details/Details";
import LandingPage from "@/components/home/landingPage/LandingPage";

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
        path: "detalles/:id",
        element: <Details />, // Esta será la ruta /pedidos/confirmar_pedido
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
      {
        path: "cambiar-contraseña",
        element: <ChangePassword />,
      },
      {
        path: "datos-personales",
        element: <DatosPersonales />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "activate/:token",
    element: <Activate />,
  },
  {
    path: "sign-up",
    element: <SingUp />,
  },
  {
    path: "landingpage",
    element: <LandingPage />,
  },
]);

export default router;
