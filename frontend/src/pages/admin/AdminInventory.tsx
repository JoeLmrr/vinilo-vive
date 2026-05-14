import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Producto } from '../../types/product';
import { 
  Database, 
  Search, 
  Save, 
  RefreshCw,
  AlertTriangle,
  Minus,
  Plus
} from 'lucide-react';

// Aseguramos el export nombrado exacto que busca App.tsx
export const AdminInventory: React.FC = () => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editedStock, setEditedStock] = useState<Record<string | number, number>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProductos();
      setProducts(data);
      const initialStock: Record<string | number, number> = {};
      data.forEach(p => {
        initialStock[p.id] = p.stock;
      });
      setEditedStock(initialStock);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStockChange = (id: string | number, newValue: number) => {
    if (newValue < 0) return;
    setEditedStock(prev => ({ ...prev, [id]: newValue }));
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      const changes = products.filter(p => editedStock[p.id] !== p.stock);
      
      if (changes.length === 0) return;

      await Promise.all(changes.map(p => 
        api.updateProducto(p.id, { stock: editedStock[p.id] })
      ));
      
      alert('Inventario actualizado con éxito');
      await fetchProducts();
    } catch (error) {
      console.error('Error saving inventory:', error);
      alert('Error al actualizar el inventario');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.artista.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasChanges = products.some(p => editedStock[p.id] !== p.stock);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-brown-800 font-serif">Control de Inventario</h2>
          <p className="text-brown-600">Gestión rápida de existencias conectada a la base de datos.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchProducts}
            className="p-3 border border-beige-100 rounded-xl hover:bg-beige-50 text-brown-400 transition-all"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleSaveAll}
            disabled={!hasChanges || isSaving}
            className="flex items-center gap-2 bg-brown-800 hover:bg-brown-900 text-white px-6 py-3 rounded-xl transition-all shadow-lg disabled:opacity-50 font-semibold"
          >
            <Save className="w-5 h-5" />
            {isSaving ? 'Guardando...' : 'Guardar Stock'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-beige-100 shadow-sm">
          <p className="text-brown-400 text-sm font-semibold uppercase">Total Productos</p>
          <p className="text-2xl font-bold text-brown-800">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-beige-100 shadow-sm">
          <p className="text-brown-400 text-sm font-semibold uppercase text-accent">Stock Crítico</p>
          <p className="text-2xl font-bold text-accent">
            {products.filter(p => p.stock < 5 && p.stock > 0).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-beige-100 shadow-sm">
          <p className="text-brown-400 text-sm font-semibold uppercase text-red-500">Agotados</p>
          <p className="text-2xl font-bold text-red-600">
            {products.filter(p => p.stock === 0).length}
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-beige-100 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-300 w-5 h-5" />
          <input
            type="text"
            placeholder="Filtrar por nombre o artista..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-beige-50/50 border border-beige-100 rounded-xl outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-beige-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-beige-50 border-b border-beige-100 text-brown-500 text-sm font-semibold uppercase">
              <tr>
                <th className="px-6 py-4">Producto</th>
                <th className="px-6 py-4 text-center">Stock Actual</th>
                <th className="px-6 py-4 text-center">Modificar</th>
                <th className="px-6 py-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const currentVal = editedStock[product.id] ?? product.stock;
                  const changed = currentVal !== product.stock;
                  
                  return (
                    <tr key={product.id} className={`hover:bg-beige-50/30 ${changed ? 'bg-accent/5' : ''}`}>
                      <td className="px-6 py-4">
                        <p className="font-bold text-brown-800">{product.nombre}</p>
                        <p className="text-sm text-brown-400">{product.artista}</p>
                      </td>
                      <td className="px-6 py-4 text-center text-brown-300">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button 
                            onClick={() => handleStockChange(product.id, currentVal - 1)}
                            className="p-1 hover:bg-beige-100 rounded text-brown-400"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            value={currentVal}
                            onChange={(e) => handleStockChange(product.id, parseInt(e.target.value) || 0)}
                            className={`w-16 text-center py-1 border rounded font-bold ${
                              changed ? 'border-accent ring-1 ring-accent' : 'border-beige-100'
                            }`}
                          />
                          <button 
                            onClick={() => handleStockChange(product.id, currentVal + 1)}
                            className="p-1 hover:bg-beige-100 rounded text-brown-400"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {currentVal === 0 ? (
                          <span className="text-red-600 font-bold text-xs flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> AGOTADO
                          </span>
                        ) : currentVal < 5 ? (
                          <span className="text-accent font-bold text-xs flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> BAJO
                          </span>
                        ) : (
                          <span className="text-green-600 font-bold text-xs">OK</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
