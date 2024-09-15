import {createBrowserRouter} from "react-router-dom";
import Layout from "@/components/Layout.jsx";
import Login from "@/components/auth/login/Login.jsx";
import SingUp from "@/components/auth/sing-up/SingUp.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: 'productos',
                element: <div>Dashboard cargado desde el hijo</div>,
            },
        ],
    },
    {
        path: 'login',
        element: <Login/>,
    },
    {
        path: 'sing-up',
        element: <SingUp/>,
    },
]);

export default router;