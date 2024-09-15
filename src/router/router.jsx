import {createBrowserRouter} from "react-router-dom";
import Layout from "@/components/Layout.jsx";
import Login from "@/components/auth/login/Login.jsx";
import SingUp from "@/components/auth/sing-up/SingUp.jsx";
import Index from "@/components/home/Productos/index.jsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: 'productos',
                element:<Index/>,
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