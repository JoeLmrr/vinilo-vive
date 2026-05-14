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

// ==============================
// CONSTANTS
// ==============================

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

// ==============================
// COMPONENT
// ==============================

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

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };

  // ==============================
  // MODAL
  // ==============================

  const handleOpenModal = (product?: Producto) => {
    if (product) {
      setCurrentProduct(product);
    } else {
      setCurrentProduct(DEFAULT_PRODUCT);
    }

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
      };

      if (
        !productToSave.slug &&
        productToSave.nombre
      ) {
        productToSave.slug = generateSlug(
          productToSave.nombre
        );
      }

      if (currentProduct.id) {
        await api.updateProducto(
          currentProduct.id,
          productToSave
        );

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

  const handleDelete = async (
    id: string | number
  ) => {
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas eliminar este producto?'
    );

    if (!confirmed) return;

    try {
      await api.deleteProducto(id);

      showNotification(
        'success',
        'Producto eliminado'
      );

      fetchProducts();
    } catch (error) {
      console.error(error);

      showNotification(
        'error',
        'Error al eliminar'
      );
    }
  };

  // ==============================
  // FILTERS
  // ==============================

  const filteredProducts = products.filter(
    (product) => {
      const term = searchTerm.toLowerCase();

      return (
        product.nombre
          .toLowerCase()
          .includes(term) ||
        product.artista
          .toLowerCase()
          .includes(term)
      );
    }
  );

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
            Administra tu catálogo de vinilos y
            accesorios.
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

      {/* NOTIFICATIONS */}
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

      {/* SEARCH + FILTERS */}
      <div className="flex flex-col gap-4 rounded-2xl border border-beige-100 bg-white p-4 shadow-sm md:flex-row">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brown-300" />

          <input
            type="text"
            placeholder="Buscar por nombre o artista..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full rounded-xl border border-beige-100 bg-beige-50/30 py-2 pl-10 pr-4 outline-none transition-all focus:ring-2 focus:ring-accent"
          />
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl border border-beige-100 px-4 py-2 text-brown-600 transition-colors hover:bg-beige-50">
          <Filter className="h-5 w-5" />
          Filtros
        </button>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="overflow-hidden rounded-2xl border border-beige-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-beige-100 bg-beige-50 text-sm font-semibold uppercase tracking-wider text-brown-500">
              <tr>
                <th className="px-6 py-4">
                  Producto
                </th>

                <th className="px-6 py-4">
                  Género
                </th>

                <th className="px-6 py-4">
                  Precio
                </th>

                <th className="px-6 py-4">
                  Stock
                </th>

                <th className="px-6 py-4">
                  Estado
                </th>

                <th className="px-6 py-4 text-right">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-beige-50">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center"
                  >
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-accent"></div>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-brown-400"
                  >
                    No se encontraron productos.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="group transition-colors hover:bg-beige-50/30"
                  >
                    {/* PRODUCT */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-beige-100 bg-beige-50">
                          {product.imagen_url ? (
                            <img
                              src={
                                product.imagen_url
                              }
                              alt={
                                product.nombre
                              }
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="h-full w-full p-3 text-brown-200" />
                          )}
                        </div>

                        <div>
                          <p className="font-bold text-brown-800">
                            {product.nombre}
                          </p>

                          <p className="text-sm text-brown-400">
                            {product.artista}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* GENRE */}
                    <td className="px-6 py-4">
                      <span className="rounded-full border border-beige-200 bg-beige-100 px-3 py-1 text-xs font-bold text-brown-700">
                        {product.genero}
                      </span>
                    </td>

                    {/* PRICE */}
                    <td className="px-6 py-4 font-bold text-brown-800">
                      $
                      {product.precio.toLocaleString()}
                    </td>

                    {/* STOCK */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            product.stock > 5
                              ? 'bg-green-500'
                              : 'bg-red-500'
                          }`}
                        />

                        <span className="font-medium text-brown-600">
                          {product.stock}{' '}
                          unidades
                        </span>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">
                      {product.activo ? (
                        <span className="text-sm font-bold text-green-600">
                          Activo
                        </span>
                      ) : (
                        <span className="text-sm font-medium text-brown-300">
                          Inactivo
                        </span>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          onClick={() =>
                            handleOpenModal(
                              product
                            )
                          }
                          className="rounded-lg p-2 text-brown-300 transition-colors hover:bg-beige-100 hover:text-accent"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              product.id
                            )
                          }
                          className="rounded-lg p-2 text-brown-300 transition-colors hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-5 w-5" />
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
    </div>
  );
};
