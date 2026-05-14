import { Filter } from 'lucide-react';

interface GenreFilterProps {
  categorias: string[];
  categoriaSeleccionada: string;
  onSelectCategoria: (cat: string) => void;
}

export function GenreFilter({ categorias, categoriaSeleccionada, onSelectCategoria }: GenreFilterProps) {
  return (
    <div>
      <h3 className="flex items-center gap-3 font-black font-serif text-brown-800 mb-8 text-xl uppercase tracking-widest">
        <Filter className="w-5 h-5 text-accent" />
        Géneros
      </h3>

      {/* MODIFICACIÓN: 
          - 'grid grid-cols-2': En móvil fuerza 2 columnas exactas.
          - 'lg:flex lg:flex-col': En PC vuelve a la lista vertical original.
      */}
      <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-col">
        {categorias.map(categoria => (
          <button
            key={categoria}
            onClick={() => onSelectCategoria(categoria)}
            className={`px-4 py-3 rounded-xl text-sm font-bold text-center lg:text-left transition-colors truncate ${
              categoriaSeleccionada === categoria
                ? "bg-brown-800 text-beige-50"
                : "bg-white text-brown-600 border border-beige-200 hover:bg-beige-200"
            }`}
            title={categoria} // Muestra el nombre completo al pasar el mouse si está truncado
          >
            {categoria}
          </button>
        ))}
      </div>
    </div>
  );
}
