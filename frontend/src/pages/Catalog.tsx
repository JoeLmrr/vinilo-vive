/**
 * @author Joe M.
 * @owner Empresa o Inc Vinilo Vive
 * @description Página del catálogo principal. Incluye filtrado, búsqueda y ordenamiento A-Z.
 */
import { motion } from 'motion/react';
import { Search, SortAsc, SortDesc, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Producto } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { GenreFilter } from '../components/GenreFilter';

export function Catalog() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Total");
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<string[]>(["Total"]);
  const [cargando, setCargando] = useState(true);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [orden, setOrden] = useState<"A-Z" | "Z-A" | "Reciente">("Reciente");

  useEffect(() => {
    setCargando(true);
    api.getProductos()
      .then(datos => {
        setProductos(datos);
        const generosUnicos = Array.from(new Set(datos.map(p => p.genero).filter(Boolean)));
        setCategorias(["Total", ...generosUnicos]);
      })
      .catch(err => console.error("Error cargando productos:", err))
      .finally(() => setCargando(false));
  }, []);

  // Lógica de Filtrado y Ordenamiento Re-integrada
  const productosFiltrados = productos
    .filter(producto => {
      const coincideCategoria = categoriaSeleccionada === "Total" || producto.genero === categoriaSeleccionada;
      const coincideBusqueda = producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) || 
                               producto.artista.toLowerCase().includes(terminoBusqueda.toLowerCase());
      return coincideCategoria && coincideBusqueda;
    })
    .sort((a, b) => {
      if (orden === "A-Z") return a.artista.localeCompare(b.artista);
      if (orden === "Z-A") return b.artista.localeCompare(a.artista);
      return 0; // "Reciente" mantiene el orden original de la API
    });

  return (
    <div className="bg-beige-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-40">
        
        <header className="mb-12 md:mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block">
              Nuestra Colección
            </span>
            <h1 className="text-5xl lg:text-8xl font-serif font-black text-brown-800 mb-6 leading-none tracking-tighter">
              Biblioteca <br /> <span className="italic text-brown-600">Analógica</span>
            </h1>
            <div className="h-1 w-16 md:w-24 bg-accent mb-6 md:mb-8"></div>
          </motion.div>
        </header>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-32 space-y-10">
              
              {/* 🔍 Buscador */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />
                <input
                  type="text"
                  placeholder="Buscar obra..."
                  value={terminoBusqueda}
                  onChange={(e) => setTerminoBusqueda(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-beige-200 rounded-2xl outline-none focus:border-accent transition-colors text-brown-800"
                />
              </div>

              {/* 📊 PANEL RE-INTEGRADO: Ordenamiento */}
              <div className="space-y-4">
                <span className="text-accent font-bold uppercase tracking-widest text-[10px] block">
                  Ordenar Catálogo
                </span>
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'Reciente', label: 'Recién Llegados', icon: Clock },
                    { id: 'A-Z', label: 'Artista (A - Z)', icon: SortAsc },
                    { id: 'Z-A', label: 'Artista (Z - A)', icon: SortDesc }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setOrden(option.id as any)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all border-2 text-sm font-semibold ${
                        orden === option.id 
                          ? 'bg-brown-800 border-brown-800 text-white shadow-lg' 
                          : 'bg-white border-beige-100 text-brown-400 hover:border-beige-200'
                      }`}
                    >
                      <option.icon className={`w-4 h-4 ${orden === option.id ? 'text-accent' : ''}`} />
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 🎼 Filtros de Género */}
              <GenreFilter 
                categorias={categorias} 
                categoriaSeleccionada={categoriaSeleccionada} 
                onSelectCategoria={setCategoriaSeleccionada} 
              />
            </div>
          </aside>

          <div className="flex-grow">
            {cargando ? (
              <div className="flex justify-center py-20 animate-pulse text-accent">Cargando biblioteca...</div>
            ) : productosFiltrados.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-beige-200 text-brown-600">
                No hay resultados para tu búsqueda.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10">
                {productosFiltrados.map((producto, indice) => (
                  <ProductCard key={producto.id} producto={producto} index={indice} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
