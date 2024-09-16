import BackPrincipal from '@/components/header/BackPrincipal.jsx';
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {Box} from "@chakra-ui/react";
import MyTabs from '@/components/tab_bar/tab_bar.jsx';

const Layout = () => {
    const user = useSelector(state => state.user);

    console.log(user);

  return (
    <div className="layout flex flex-col">
      <BackPrincipal />
      <MyTabs/>
      <div className="flex">
        <Box overflowY={'auto'} bg="#ffffe9" w="full">
          <Outlet/>
        </Box>
      </div>
    </div>
  );
};

export default Layout;

