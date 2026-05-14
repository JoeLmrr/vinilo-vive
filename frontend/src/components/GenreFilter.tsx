import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';

interface GenreFilterProps {
  categorias: string[];
  categoriaSeleccionada: string;
  onSelectCategoria: (cat: string) => void;
}

export function GenreFilter({ categorias, categoriaSeleccionada, onSelectCategoria }: GenreFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-beige-50/50 rounded-2xl p-4 lg:p-0">
      {/* BOTÓN PARA MÓVIL: Solo se ve en pantallas pequeñas */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex lg:hidden w-full items-center justify-between bg-brown-800 text-beige-50 px-6 py-4 rounded-xl shadow-lg active:scale-95 transition-transform"
      >
        <div className="flex items-center gap-3 font-bold uppercase tracking-widest text-sm">
          <Filter className="w-4 h-4" />
          Filtrar Géneros
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* TÍTULO PARA PC: Solo se ve en pantallas grandes */}
      <h3 className="hidden lg:flex items-center gap-3 font-black font-serif text-brown-800 mb-8 text-xl uppercase tracking-widest">
        <Filter className="w-5 h-5 text-accent" />
        Géneros
      </h3>

      {/* CONTENEDOR DE BOTONES: 
          - En móvil: Se oculta/muestra con el estado 'isOpen' y usa 2 columnas.
          - En PC: Siempre visible y en columna vertical.
      */}
      <div className={`
        ${isOpen ? 'grid' : 'hidden'} 
        lg:flex lg:flex-col grid-cols-2 gap-3 mt-4 lg:mt-0
      `}>
        {categorias.map(categoria => (
          <button
            key={categoria}
            onClick={() => {
              onSelectCategoria(categoria);
              setIsOpen(false); // Cierra el menú al seleccionar en móvil
            }}
            className={`px-4 py-3 rounded-xl text-sm font-bold transition-all truncate ${
              categoriaSeleccionada === categoria
                ? "bg-brown-800 text-beige-50 shadow-md scale-[1.02]"
                : "bg-white text-brown-600 border border-beige-200 hover:bg-beige-200"
            } text-center lg:text-left`}
          >
            {categoria}
          </button>
        ))}
      </div>
    </div>
  );
}
