import { Producto } from '../types/product';

// Detectar el host actual para que funcione tanto en localhost como por IP en la red
const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    return `http://${hostname}:3001`;
  }
  return 'http://localhost:3001';
};

const API_URL = getApiUrl();

export const api = {
  getProductos: async (genero?: string): Promise<Producto[]> => {
    const url = genero && genero !== "Total" 
      ? `${API_URL}/productos?genero=${genero}` 
      : `${API_URL}/productos`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error al obtener productos');
    return res.json();
  },
  
  getDiscoDelMes: async (): Promise<Producto | null> => {
    const res = await fetch(`${API_URL}/disco-del-mes`);
    if (!res.ok) throw new Error('Error al obtener disco del mes');
    return res.json();
  },
  
  getRecienLlegados: async (): Promise<Producto[]> => {
    const res = await fetch(`${API_URL}/recien-llegados`);
    if (!res.ok) throw new Error('Error al obtener recién llegados');
    return res.json();
  },
  
  getDestacados: async (): Promise<Producto[]> => {
    const res = await fetch(`${API_URL}/destacados`);
    if (!res.ok) throw new Error('Error al obtener destacados');
    return res.json();
  },

  getProductoById: async (idOrSlug: string): Promise<Producto> => {
    const res = await fetch(`${API_URL}/productos/${idOrSlug}`);
    if (!res.ok) throw new Error('Producto no encontrado');
    return res.json();
  },

  createOrder: async (orderData: { 
    usuario_id?: string, 
    total: number, 
    items: any[],
    nombre: string,
    email: string,
    direccion: string,
    ciudad: string,
    codigoPostal: string
  }): Promise<{ success: boolean, orden_id: string }> => {
    const res = await fetch(`${API_URL}/ordenes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (!res.ok) throw new Error('Error al crear la orden');
    return res.json();
  },

  // Admin Methods
  getAdminStats: async (): Promise<{ totalProductos: number, totalOrdenes: number, totalVentas: number }> => {
    const res = await fetch(`${API_URL}/admin/stats`);
    if (!res.ok) throw new Error('Error al obtener estadísticas');
    return res.json();
  },

  createProducto: async (producto: Partial<Producto>): Promise<Producto> => {
    const res = await fetch(`${API_URL}/productos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });
    if (!res.ok) throw new Error('Error al crear el producto');
    return res.json();
  },

  updateProducto: async (id: string | number, updateData: Partial<Producto>): Promise<Producto> => {
    const res = await fetch(`${API_URL}/productos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    if (!res.ok) throw new Error('Error al actualizar el producto');
    return res.json();
  },

  deleteProducto: async (id: string | number): Promise<{ success: boolean }> => {
    const res = await fetch(`${API_URL}/productos/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Error al eliminar el producto');
    return res.json();
  },

  getOrdenes: async (): Promise<any[]> => {
    const res = await fetch(`${API_URL}/admin/ordenes`);
    if (!res.ok) throw new Error('Error al obtener órdenes');
    return res.json();
  },

  getOrdenById: async (id: string | number): Promise<any> => {
    const res = await fetch(`${API_URL}/admin/ordenes/${id}`);
    if (!res.ok) throw new Error('Error al obtener detalles de la orden');
    return res.json();
  },

  updateOrdenEstado: async (id: string | number, estado: string): Promise<any> => {
    const res = await fetch(`${API_URL}/admin/ordenes/${id}/estado`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado })
    });
    if (!res.ok) throw new Error('Error al actualizar el estado de la orden');
    return res.json();
  }
};
