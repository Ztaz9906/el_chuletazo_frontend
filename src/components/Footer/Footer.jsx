const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#FAF9F6] via-[rgba(250,249,246,0.7)] to-transparent py-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-6 md:mb-0">
            <h2 className="text-gray-700 text-lg font-bold mb-4">DIRECCIÓN</h2>
            <p className="text-gray-600 text-base leading-relaxed">6801 Los Volcanes Rd NW,</p>
            <p className="text-gray-600 text-base leading-relaxed">Albuquerque, NM 87121</p>
            <p className="text-gray-600 text-base leading-relaxed">Abierto todos los días: 8:00am-5:00pm</p>
          </div>
          
          <div className="mb-6 md:mb-0">
            <h2 className="text-gray-700 text-lg font-bold mb-4">CONTACTOS</h2>
            <p className="text-gray-600 text-base leading-relaxed">Teléfono: +1 (505) 340-1674</p>
            <p className="text-gray-600 text-base leading-relaxed">Email: ayuda@elchuletazo.com</p>
          </div>
          
          <div className="mb-6 md:mb-0">
          </div>
        </div>
        
        <div className="mt-10 border-t border-gray-200 pt-6">
          <p className="text-gray-500 text-base text-center max-w-3xl mx-auto">
            Para cualquier información adicional, por favor comuníquese con nosotros a través de los contactos proporcionados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;