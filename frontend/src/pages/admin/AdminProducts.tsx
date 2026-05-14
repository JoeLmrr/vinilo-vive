// ==============================
// AdminProducts.tsx
// ==============================

import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  Check,
  Edit2,
  Filter,
  Image as ImageIcon,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';

import { api } from '../../services/api';
import { Producto } from '../../types/product';

const DEFAULT_PRODUCT: Partial<Producto> = {
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
  orden_home: 0,
};

export const AdminProducts = () => {
  // ==============================
  // STATES
  // ==============================

  const [products, setProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] =
    useState<Partial<Producto> | null>(null);

  const [isSaving, setIsSaving] = useState(false);

  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // ==============================
  // EFFECTS
  // ==============================

  useEffect(() => {
    fetchProducts();
  }, []);

  // ==============================
  // API
  // ==============================

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

  // ==============================
  // HELPERS
  // ==============================

  const showNotification = (
    type: 'success' | 'error',
    message: string
  ) => {
    setNotification({ type, message });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

  // ==============================
  // MODAL
  // ==============================

  const handleOpenModal = (product?: Producto) => {
    setCurrentProduct(product || DEFAULT_PRODUCT);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  // ==============================
  // CRUD
  // ==============================

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentProduct) return;

    setIsSaving(true);

    try {
      const productToSave = {
        ...currentProduct,
        slug:
          currentProduct.slug ||
          generateSlug(currentProduct.nombre || ''),
      };

      if (currentProduct.id) {
        await api.updateProducto(currentProduct.id, productToSave);

        showNotification(
          'success',
          'Producto actualizado correctamente'
        );
      } else {
        await api.createProducto(productToSave);

        showNotification(
          'success',
          'Producto creado correctamente'
        );
      }

      await fetchProducts();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving product:', error);

      showNotification(
        'error',
        'Error al guardar el producto'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas eliminar este producto?'
    );

    if (!confirmed) return;

    try {
      await api.deleteProducto(id);

      showNotification('success', 'Producto eliminado');

      fetchProducts();
    } catch (error) {
      console.error(error);

      showNotification('error', 'Error al eliminar');
    }
  };

  // ==============================
  // FILTERS
  // ==============================

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();

    return (
      product.nombre.toLowerCase().includes(term) ||
      product.artista.toLowerCase().includes(term)
    );
  });

  // ==============================
  // RENDER
  // ==============================

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brown-800">
            Gestión de Productos
          </h1>

          <p className="text-brown-600">
            Administra tu catálogo de vinilos y accesorios.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 rounded-xl bg-brown-700 px-6 py-3 font-semibold text-white shadow-lg shadow-brown-900/10 transition-all hover:bg-brown-800"
        >
          <Plus className="h-5 w-5" />
          Añadir Producto
        </button>
      </div>

      {/* NOTIFICATION */}
      {notification && (
        <div
          className={`fixed right-6 top-6 z-50 flex items-center gap-3 rounded-2xl px-6 py-4 shadow-2xl transition-all animate-in fade-in slide-in-from-top-4 ${
            notification.type === 'success'
              ? 'bg-green-600 text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          {notification.type === 'success' ? (
            <Check className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}

          <span className="font-semibold">
            {notification.message}
          </span>
        </div>
      )}

      {/* SEARCH */}
      <div className="flex flex-col gap-4 rounded-2xl border border-beige-100 bg-white p-4 shadow-sm md:flex-row">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brown-300" />

          <input
            type="text"
            placeholder="Buscar por nombre o artista..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-beige-100 bg-beige-50/30 py-2 pl-10 pr-4 outline-none transition-all focus:ring-2 focus:ring-accent"
          />
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl border border-beige-100 px-4 py-2 text-brown-600 transition-colors hover:bg-beige-50">
          <Filter className="h-5 w-5" />
          Filtros
        </button>
      </div>
    </div>
  );
};
