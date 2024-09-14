import React from 'react';
import producto from '@/assets/producto.png';

const ProductCard = () => {
  return (
    <div className="max-w-sm mx-auto bg-gray-400 shadow-md rounded-lg overflow-hidden mt-4">
      <div className="p-2">
        <img className="w-full h-48 object-cover" src={producto} alt="Carne de Res Troceada" />
      </div>
      
      <div className="p-2">
        <div className="bg-green-500 flex items-center p-4 rounded">
            <h2 className="text-xl text-white font-bold mr-4 ">Carne de Res Troceada</h2>
            <div className="flex items-center bg-orange-100 rounded shadow-inner-custom">
                <button className="bg-gray-300 text-gray-700 px-2 py-1 rounded-l">-</button>
                <span className="px-4 shadow-inner">0</span>
                <button className="bg-gray-300 text-gray-700 px-2 py-1 rounded-r">+</button>
            </div>
        </div>

        <p className="mt-4">En esta área se escribirán detalles del producto.</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold">$6.99/lb</span>
          <div className="flex space-x-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded">Añadir al carrito</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;