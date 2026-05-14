// ==============================
// IMPORTACIONES
// ==============================

// Importa React y los hooks useEffect y useState
import React, { useEffect, useState } from 'react';

// Importa la API personalizada
import { api } from '../../services/api';

// Importa el tipo Producto
import { Producto } from '../../types/product';

// Importa iconos desde lucide-react
import {
  Database,
  Search,
  Save,
  RefreshCw,
  AlertTriangle,
  ArrowRight,
  Minus,
  Plus
} from 'lucide-react';


// ==============================
// COMPONENTE PRINCIPAL
// ==============================

export const AdminInventory = () => {

  // Estado para almacenar productos
  const [products, setProducts] = useState<Producto[]>([]);

  // Estado de carga
  const [loading, setLoading] = useState(true);

  // Estado para búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Estado para manejar cambios de stock
  const [editedStock, setEditedStock] = useState<Record<string | number, number>>({});

  // Estado mientras se guardan cambios
  const [isSaving, setIsSaving] = useState(false);


  // ==============================
  // EFECTO INICIAL
  // ==============================

  // Ejecuta fetchProducts al cargar el componente
  useEffect(() => {
    fetchProducts();
  }, []);


  // ==============================
  // OBTENER PRODUCTOS
  // ==============================

  const fetchProducts = async () => {

    try {

      // Activa loading
      setLoading(true);

      // Obtiene productos desde API
      const data = await api.getProductos();

      // Guarda productos en estado
      setProducts(data);

      // Inicializa stock editable
      const initialStock: Record<string | number, number> = {};

      // Guarda el stock actual de cada producto
      data.forEach(p => initialStock[p.id] = p.stock);

      // Actualiza estado editable
      setEditedStock(initialStock);

    } catch (error) {

      // Error en consola
      console.error('Error fetching inventory:', error);

    } finally {

      // Desactiva loading
      setLoading(false);

    }
  };


  // ==============================
  // CAMBIAR STOCK
  // ==============================

  const handleStockChange = (
    id: string | number,
    newValue: number
  ) => {

    // Evita números negativos
    if (newValue < 0) return;

    // Actualiza stock editado
    setEditedStock(prev => ({
      ...prev,
      [id]: newValue
    }));
  };


  // ==============================
  // GUARDAR CAMBIOS
  // ==============================

  const handleSaveAll = async () => {

    // Activa guardado
    setIsSaving(true);

    try {

      // Filtra productos modificados
      const changes = products.filter(
        p => editedStock[p.id] !== p.stock
      );

      // Actualiza todos los productos modificados
      await Promise.all(
        changes.map(p =>
          api.updateProducto(p.id, {
            stock: editedStock[p.id]
          })
        )
      );

      // Mensaje éxito
      alert('Inventario actualizado correctamente');

      // Refresca productos
      fetchProducts();

    } catch (error) {

      // Error consola
      console.error('Error saving inventory:', error);

      // Mensaje error
      alert('Error al actualizar el inventario');

    } finally {

      // Finaliza guardado
      setIsSaving(false);

    }
  };


  // ==============================
  // FILTRAR PRODUCTOS
  // ==============================

  const filteredProducts = products.filter(p =>

    // Busca por nombre
    p.nombre.toLowerCase().includes(
      searchTerm.toLowerCase()
    )

    ||

    // Busca por artista
    p.artista.toLowerCase().includes(
      searchTerm.toLowerCase()
    )
  );


  // ==============================
  // DETECTAR CAMBIOS
  // ==============================

  const hasChanges = products.some(
    p => editedStock[p.id] !== p.stock
  );


  // ==============================
  // RENDER DEL COMPONENTE
  // ==============================

  return (

    <div className="space-y-6 font-sans">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold text-brown-800 font-serif">
            Control de Inventario
          </h1>

          <p className="text-brown-600">
            Actualiza rápidamente el stock de tus productos.
          </p>

        </div>


        {/* BOTONES */}
        <div className="flex gap-3">

          {/* BOTÓN REFRESH */}
          <button
            onClick={fetchProducts}
            className="p-3 border border-beige-100 rounded-xl hover:bg-beige-50 text-brown-400 transition-all"
            title="Refrescar datos"
          >

            <RefreshCw
              className={`w-5 h-5 ${
                loading ? 'animate-spin' : ''
              }`}
            />

          </button>


          {/* BOTÓN GUARDAR */}
          <button
            onClick={handleSaveAll}
            disabled={!hasChanges || isSaving}
            className="flex items-center gap-2 bg-brown-800 hover:bg-brown-900 text-white px-6 py-3 rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >

            <Save className="w-5 h-5" />

            {isSaving
              ? 'Guardando...'
              : 'Guardar Cambios'}

          </button>

        </div>

      </div>


      {/* RESUMEN ESTADÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* TOTAL PRODUCTOS */}
        <div className="bg-white p-6 rounded-2xl border border-beige-100 shadow-sm">

          <p className="text-brown-400 text-sm font-semibold uppercase tracking-wider">
            Total SKUs
          </p>

          <p className="text-2xl font-bold text-brown-800">
            {products.length}
          </p>

        </div>


        {/* STOCK BAJO */}
        <div className="bg-white p-6 rounded-2xl border border-beige-100 shadow-sm">

          <p className="text-brown-400 text-sm font-semibold uppercase tracking-wider">
            Stock Bajo (&lt; 5)
          </p>

          <p className="text-2xl font-bold text-accent">

            {
              products.filter(p => p.stock < 5).length
            }

          </p>

        </div>


        {/* AGOTADOS */}
        <div className="bg-white p-6 rounded-2xl border border-beige-100 shadow-sm">

          <p className="text-brown-400 text-sm font-semibold uppercase tracking-wider">
            Agotados
          </p>

          <p className="text-2xl font-bold text-red-600">

            {
              products.filter(p => p.stock === 0).length
            }

          </p>

        </div>

      </div>


      {/* BUSCADOR */}
      <div className="bg-white p-4 rounded-2xl border border-beige-100 shadow-sm">

        <div className="relative">

          {/* ICONO BUSCAR */}
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-300 w-5 h-5" />

          {/* INPUT BUSCADOR */}
          <input
            type="text"
            placeholder="Buscar por nombre o artista..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full pl-10 pr-4 py-3 bg-beige-50/50 border border-beige-100 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
          />

        </div>

      </div>

    </div>
  );
};
