import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Producto } from '../../types/product';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  MoreVertical,
  Filter,
  X,
  Image as ImageIcon,
  Check,
  AlertCircle
} from 'lucide-react';

export const AdminProducts = () => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Producto> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProductos();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenModal = (product?: Producto) => {
    if (product) {
      setCurrentProduct(product);
    } else {
      setCurrentProduct({
        nombre: '',
        artista: '',
        descripcion: '',
        precio: 0,
        stock: 0,
        imagen_url: '',
        genero: 'Rock',
        formato: 'Vinilo',
        condicion: 'Nuevo',
        activo: true,
        disco_del_mes: false,
        recien_llegado: false,
        destacado: false,
        orden_home: 0
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;

    setIsSaving(true);
    try {
      // Aseguramos que la URL sea un string limpio para la base de datos
      const productToSave = { 
        ...currentProduct,
        imagen_url: currentProduct.imagen_url?.trim() || ''
      };

      // Generar slug si no existe
      if (!productToSave.slug && productToSave.nombre) {
        productToSave.slug = productToSave.nombre
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, '');
      }

      if (currentProduct.id) {
        await api.updateProducto(currentProduct.id, productToSave);
        showNotification('success', 'Producto actualizado correctamente');
      } else {
        await api.createProducto(productToSave);
        showNotification('success', 'Producto creado correctamente');
      }
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving product:', error);
      showNotification('error', 'Error al guardar el producto');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await api.deleteProducto(id);
        showNotification('success', 'Producto eliminado');
        fetchProducts();
      } catch (error) {
        showNotification('error', 'Error al eliminar');
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.artista.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brown-800 font-serif">Gestión de Productos</h1>
          <p className="text-brown-600">Administra tu catálogo de vinilos y accesorios.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 bg-brown-700 hover:bg-brown-800 text-white px-6 py-3 rounded-xl transition-all shadow-lg shadow-brown-900/10 font-semibold"
        >
          <Plus className="w-5 h-5" />
          Añadir Producto
        </button>
      </div>

      {/* Notifications */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl transition-all animate-in fade-in slide-in-from-top-4 ${
          notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {notification.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="font-semibold">{notification.message}</span>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-2xl border border-beige-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-300 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre o artista..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-beige-100 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all bg-beige-50/30"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-beige-100 rounded-xl hover:bg-beige-50 transition-colors text-brown-600">
          <Filter className="w-5 h-5" />
          Filtros
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-beige-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-beige-50 border-b border-beige-100 text-brown-500 text-sm uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Producto</th>
                <th className="px-6 py-4">Género</th>
                <th className="px-6 py-4">Precio</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-brown-400">
                    No se encontraron productos.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-beige-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-beige-50 overflow-hidden flex-shrink-0 border border-beige-100">
                          {product.imagen_url ? (
                            <img src={product.imagen_url} alt={product.nombre} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-full h-full p-3 text-brown-200" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-brown-800">{product.nombre}</p>
                          <p className="text-sm text-brown-400">{product.artista}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-beige-100 text-brown-700 rounded-full text-xs font-bold border border-beige-200">
                        {product.genero}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-brown-800">
                      ${product.precio.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${product.stock > 5 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <span className="font-medium text-brown-600">{product.stock} unidades</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {product.activo ? (
                        <span className="text-green-600 text-sm font-bold">Activo</span>
                      ) : (
                        <span className="text-brown-300 text-sm font-medium">Inactivo</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenModal(product)}
                          className="p-2 hover:bg-beige-100 text-brown-300 hover:text-accent rounded-lg transition-colors"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-red-50 text-brown-300 hover:text-red-500 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && currentProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brown-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-white px-8 py-6 border-b border-beige-100 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-brown-800 font-serif">
                {currentProduct.id ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button onClick={handleCloseModal} className="p-2 hover:bg-beige-50 rounded-full transition-colors">
                <X className="w-6 h-6 text-brown-300" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-accent uppercase tracking-widest">Información Básica</h3>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-brown-700">Nombre del Álbum / Producto</label>
                    <input
                      type="text"
                      required
                      value={currentProduct.nombre || ''}
                      onChange={(e) => setCurrentProduct({...currentProduct, nombre: e.target.value})}
                      className="w-full px-4 py-3 bg-beige-50/50 border border-beige-100 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
                      placeholder="Ej: Dark Side of the Moon"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-brown-700">Artista / Marca</label>
                    <input
                      type="text"
                      required
                      value={currentProduct.artista || ''}
                      onChange={(e) => setCurrentProduct({...currentProduct, artista: e.target.value})}
                      className="w-full px-4 py-3 bg-beige-50/50 border border-beige-100 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
                      placeholder="Ej: Pink Floyd"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-brown-700">Precio ($)</label>
                      <input
                        type="number"
                        required
                        value={currentProduct.precio || 0}
                        onChange={(e) => setCurrentProduct({...currentProduct, precio: parseFloat(e.target.value)})}
                        className="w-full px-4 py-3 bg-beige-50/50 border border-beige-100 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-brown-700">Stock Inicial</label>
                      <input
                        type="number"
                        required
                        value={currentProduct.stock || 0}
                        onChange={(e) => setCurrentProduct({...currentProduct, stock: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 bg-beige-50/50 border border-beige-100 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-brown-700">Descripción</label>
                    <textarea
                      rows={4}
                      value={currentProduct.descripcion || ''}
                      onChange={(e) => setCurrentProduct({...currentProduct, descripcion: e.target.value})}
                      className="w-full px-4 py-3 bg-beige-50/50 border border-beige-100 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all resize-none"
                      placeholder="Breve descripción del producto..."
                    />
                  </div>
                </div>

                {/* Categories and Media */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-accent uppercase tracking-widest">Detalles y Media</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-brown-700">Género</label>
                      <select
                        value={currentProduct.genero || 'Rock'}
                        onChange={(e) => setCurrentProduct({...currentProduct, genero: e.target.value})}
                        className="w-full px-4 py-3 bg-beige-50/50 border border-beige-100 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
                      >
                        <option value="Rock">Rock</option>
                        <option value="Jazz">Jazz</option>
                        <option value="Pop">Pop</option>
                        <option value="Electronica">Electrónica</option>
                        <option value="Blues">Blues</option>
                        <option value="Metal">Metal</option>
                        <option value="Accesorios">Accesorios</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-brown-700">Formato</label>
                      <select
                        value={currentProduct.formato || 'Vinilo'}
                        onChange={(e) => setCurrentProduct({...currentProduct, formato: e.target.value})}
                        className="w-full px-4 py-3 bg-beige-50/50 border border-beige-100 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
                      >
                        <option value="Vinilo">Vinilo LP</option>
                        <option value="Vinilo 7">Vinilo 7"</option>
                        <option value="CD">CD</option>
                        <option value="Accesorio">Accesorio</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-brown-700">URL de la Imagen</label>
                    <div className="flex gap-4">
                      <div className="flex-grow">
                        <input
                          type="text"
                          value={currentProduct.imagen_url || ''}
                          onChange={(e) => setCurrentProduct({...currentProduct, imagen_url: e.target.value})}
                          className="w-full px-4 py-3 bg-beige-50/50 border border-beige-100 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
                          placeholder="https://..."
                        />
                      </div>
                      <div className="w-14 h-14 rounded-xl bg-beige-50 border border-beige-100 flex-shrink-0 overflow-hidden">
                        {currentProduct.imagen_url ? (
                          <img src={currentProduct.imagen_url} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-full h-full p-4 text-brown-200" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={currentProduct.disco_del_mes || false}
                        onChange={(e) => setCurrentProduct({...currentProduct, disco_del_mes: e.target.checked})}
                        className="w-5 h-5 rounded border-beige-200 text-accent focus:ring-accent transition-all"
                      />
                      <span className="text-sm font-medium text-brown-700 group-hover:text-accent">Disco del Mes</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={currentProduct.destacado || false}
                        onChange={(e) => setCurrentProduct({...currentProduct, destacado: e.target.checked})}
                        className="w-5 h-5 rounded border-beige-200 text-accent focus:ring-accent transition-all"
                      />
                      <span className="text-sm font-medium text-brown-700 group-hover:text-accent">Destacado en Home</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={currentProduct.recien_llegado || false}
                        onChange={(e) => setCurrentProduct({...currentProduct, recien_llegado: e.target.checked})}
                        className="w-5 h-5 rounded border-beige-200 text-accent focus:ring-accent transition-all"
                      />
                      <span className="text-sm font-medium text-brown-700 group-hover:text-accent">Recién Llegado</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-beige-100 flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-3 border border-beige-100 rounded-xl hover:bg-beige-50 font-semibold transition-all text-brown-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-10 py-3 bg-brown-700 hover:bg-brown-800 text-white rounded-xl font-bold shadow-lg shadow-brown-900/10 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : <Check className="w-5 h-5" />}
                  {currentProduct.id ? 'Actualizar Producto' : 'Crear Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
