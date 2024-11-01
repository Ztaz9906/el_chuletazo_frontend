import React from 'react';
import { Ban } from 'lucide-react';

const CanceledBanner = () => {
  return (
    <div className="absolute right-1">
      <div className="relative">
        {/* Sombra animada */}
        <div className="absolute top-0 right-0 w-32 h-32 animate-pulse">
          <div className="absolute top-4 right-4 w-24 h-24 bg-red-500/20 rounded-full blur-lg"></div>
        </div>
        
        {/* Banderín principal */}
        <div className="relative">
          {/* Cinta superior */}
          <div className="absolute -top-1 right-0 w-28 h-12 bg-red-500 transform rotate-12 shadow-lg">
            <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[14px] border-l-transparent border-b-[14px] border-b-red-700"></div>
          </div>
          
          {/* Contenido del banderín */}
          <div className="relative z-10 w-28 h-12 bg-red-500 flex items-center justify-center transform -rotate-12 shadow-lg">
            <div className="flex items-center gap-1 text-white">
              <Ban className="w-4 h-4" />
              <span className="text-sm font-bold tracking-wide">CANCELADO</span>
            </div>
          </div>
          
          {/* Pliegue decorativo */}
          <div className="absolute -top-1 right-0 w-4 h-4 bg-red-700 transform -rotate-45"></div>
          
          {/* Sombra del pliegue */}
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-900/30 transform rotate-12"></div>
        </div>
      </div>
    </div>
  );
};

export default CanceledBanner;