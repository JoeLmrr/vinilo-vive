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

      <div className="flex lg:flex-col flex-wrap gap-3">
        {categorias.map(categoria => (
          <button
            key={categoria}
            onClick={() => onSelectCategoria(categoria)}
            className={`px-6 py-3 rounded-xl text-sm font-bold text-left transition-colors ${
              categoriaSeleccionada === categoria
                ? "bg-brown-800 text-beige-50"
                : "bg-white text-brown-600 border border-beige-200 hover:bg-beige-200"
            }`}
          >
            {categoria}
          </button>
        ))}
      </div>
    </div>
  );
}
