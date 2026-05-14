import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Producto } from '../../types/product';
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

export const AdminInventory = () => {
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
      // Initialize edited stock with current values
      const initialStock: Record<string | number, number> = {};
      data.forEach(p => initialStock[p.id] = p.stock);
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
      // Find changed items
      const changes = products.filter(p => editedStock[p.id] !== p.stock);
      
      await Promise.all(changes.map(p => 
        api.updateProducto(p.id, { stock: editedStock[p.id] })
      ));

      alert('Inventario actualizado correctamente');
      fetchProducts();
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
          <h1 className="text-3xl font-bold text-brown-800 font-serif">Control de Inventario</h1>
          <p className="text-brown-600">Actualiza rápidamente el stock de tus productos.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchProducts}
            className="p-3 border border-beige-100 rounded-xl hover:bg-beige-50 text-brown-400 transition-all"
            title="Refrescar datos"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleSaveAll}
            disabled={!hasChanges || isSaving}
            className="flex items-center gap-2 bg-brown-800 hover:bg-brown-900 text-white px-6 py-3 rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            <Save className="w-5 h-5" />
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-beige-100 shadow-sm">
          <p className="text-brown-400 text-sm font-semibold uppercase tracking-wider">Total SKUs</p>
          <p className="text-2xl font-bold text-brown-800">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-beige-100 shadow-sm">
          <p className="text-brown-400 text-sm font-semibold uppercase tracking-wider">Stock Bajo (&lt; 5)</p>
          <p className="text-2xl font-bold text-accent">
            {products.filter(p => p.stock < 5).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-beige-100 shadow-sm">
          <p className="text-brown-400 text-sm font-semibold uppercase tracking-wider">Agotados</p>
          <p className="text-2xl font-bold text-red-600">
            {products.filter(p => p.stock === 0).length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-beige-100 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-300 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre o artista..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-beige-50/50 border border-beige-100 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-beige-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-beige-50 border-b border-beige-100 text-brown-500 text-sm uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Producto</th>
                <th className="px-6 py-4 text-center">Stock Actual</th>
                <th className="px-6 py-4 text-center">Nuevo Stock</th>
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
              ) : filteredProducts.map((product) => {
                const currentEdited = editedStock[product.id];
                const isChanged = currentEdited !== product.stock;
                
                return (
                  <tr key={product.id} className={`hover:bg-beige-50/30 transition-colors ${isChanged ? 'bg-accent/5' : ''}`}>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-brown-800">{product.nombre}</p>
                        <p className="text-sm text-brown-400">{product.artista}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-medium text-brown-300">{product.stock}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-4">
                        <button 
                          onClick={() => handleStockChange(product.id, currentEdited - 1)}
                          className="p-1 hover:bg-beige-100 rounded-lg transition-colors text-brown-400"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          value={currentEdited}
                          onChange={(e) => handleStockChange(product.id, parseInt(e.target.value) || 0)}
                          className={`w-20 text-center py-2 border rounded-lg font-bold outline-none transition-all ${
                            isChanged ? 'border-accent bg-white ring-2 ring-accent/20 text-brown-800' : 'border-beige-100 bg-beige-50/50 text-brown-600'
                          }`}
                        />
                        <button 
                          onClick={() => handleStockChange(product.id, currentEdited + 1)}
                          className="p-1 hover:bg-beige-100 rounded-lg transition-colors text-brown-400"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {currentEdited === 0 ? (
                        <span className="flex items-center gap-1.5 text-red-600 font-bold text-sm">
                          <AlertTriangle className="w-4 h-4" />
                          AGOTADO
                        </span>
                      ) : currentEdited < 5 ? (
                        <span className="flex items-center gap-1.5 text-accent font-bold text-sm">
                          <AlertTriangle className="w-4 h-4" />
                          STOCK BAJO
                        </span>
                      ) : (
                        <span className="text-green-600 font-bold text-sm">SALUDABLE</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
