import BackPrincipal from '@/components/header/BackPrincipal.jsx';

import SideBar from '@/components/SideBar/SideBar.jsx';
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {Box} from "@chakra-ui/react";

const Layout = () => {
    const user = useSelector(state => state.user);

    console.log(user);

  return (
    <div className="layout flex flex-col">
      <BackPrincipal />
      <div className="flex">
        <SideBar/>
        <Box overflowY={'auto'} bg="#ffffe9">
          <Outlet/>
        </Box>
      </div>
    </div>
  );
};

export default Layout;

