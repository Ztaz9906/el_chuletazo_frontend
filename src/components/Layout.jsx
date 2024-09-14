import Header from '@/components/Header';
import BackPrincipal from '@/components/BackPrincipal';
import ProductCard from '@/components/ProductCard';
import SideBar from '@/components/SideBar';

const Layout = ({ children }) => {
  return (
    <div className="layout flex flex-col">
      <BackPrincipal />
      <div className="flex">
        <SideBar/>
        <ProductCard />
      </div>
    </div>
  );
};

export default Layout;

