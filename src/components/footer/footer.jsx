import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-40 text-white py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-base font-bold">Dirección</h2>
            <p className="text-sm">6801 Los Volcanes Rd NW, Albuquerque, NM 87121</p>
            <p className="text-sm">Abierto todos los días: 8:00am-5:00pm</p>
          </div>
          <div className="mb-4 md:mb-0">
            <h2 className="text-base font-bold">Contactos</h2>
            <p className="text-sm">Teléfono: +1 (505) 340-1674</p>
            <p className="text-sm">Email: ayuda@elchuletazo.com</p>
          </div>
          <div className="mb-4 md:mb-0">
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm">Para cualquier información adicional, por favor comuníquese con nosotros a través de los contactos proporcionados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
