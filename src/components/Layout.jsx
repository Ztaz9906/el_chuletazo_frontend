import BackPrincipal from '@/components/BackPrincipal';

import SideBar from '@/components/SideBar';
import {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {useGetProductoQuery} from "@/servicios/api/productos/index.js";

const Layout = () => {
    const user = useSelector(state => state.user);

    console.log(user);
    // Directly call useGetProductoQuery to get data, isLoading, and error
    const { isLoading, data, error } = useGetProductoQuery();

    useEffect(() => {
        if (!isLoading && data) {
            console.log("Products data:", data); // Log products to the console
        }

        if (error) {
            console.error("Error fetching products:", error); // Log any errors
        }
    }, [isLoading, data, error]); // Only runs when these values change

  return (
    <div className="layout flex flex-col">
      <BackPrincipal />
      <div className="flex">
        <SideBar/>
        <Outlet/>
      </div>
    </div>
  );
};

export default Layout;

