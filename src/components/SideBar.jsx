import React, { useState } from 'react';
import mp_visa from '@/assets/ic_VISA.png';
import mp_mastercard from '@/assets/ic_mastercard.png';

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState(null);

  const buttons = [
    { name: 'Productos más vendidos', onClick: () => setActiveButton('Productos más vendidos') },
    { name: 'Todos los productos', onClick: () => setActiveButton('Todos los productos') },
    { name: 'Carne de Cerdo', onClick: () => setActiveButton('Carne de Cerdo') },
    { name: 'Cerdo Ahumado', onClick: () => setActiveButton('Cerdo Ahumado') },
    { name: 'Embutidos', onClick: () => setActiveButton('Embutidos') },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-full p-2 max-w-sm shadow-md overflow-hidden">
      <ul>
        {buttons.map((button, index) => (
          <li key={index} className="mb-2">
            <button
              className={`w-full text-left py-2 px-4 rounded ${activeButton === button.name ? 'bg-green-500' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={button.onClick}
            >
              {button.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Métodos de Pago:</h3>
        <div className="flex space-x-4">
          <img src={mp_visa} alt="Visa" className="w-16" />
          <img src={mp_mastercard} alt="MasterCard" className="w-16" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;





