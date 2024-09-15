import '@/components/BackPrincipal.css';
import Header from "@/components/Header.jsx";

const BackPrincipal = () => {
  return (
      <div className="background flex flex-col">
          <Header/>
          <div className="flex-grow flex flex-col justify-center p-4 md:p-8 relative z-10">
              <h1 className="text-white text-xl sm:text-2xl md:text-4xl font-rounded leading-tight mb-4">
                  Adquiere de forma rápida y sencilla<br/>
                  los productos que necesita<br/>
              </h1>
          </div>
          <header className="p-3 bg-black bg-opacity-60 ">
              <h1 className="text-white text-[14px]">
                  En nuestra tienda online usted podrá comprar y enviar productos a sus familiares y amigos en Cuba
              </h1>
          </header>
      </div>
  );
};

export default BackPrincipal;
