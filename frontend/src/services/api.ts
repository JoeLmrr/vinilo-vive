import { Producto } from '../types/product';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

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
  }):
