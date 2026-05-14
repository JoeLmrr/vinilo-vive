export interface Producto {
  id: number | string;
  nombre: string;
  artista: string;
  descripcion: string;
  descripcion_larga: string | null;
  precio: number;
  stock: number;
  imagen_url: string;
  banner_url: string | null;
  genero: string;
  slug: string | null;
  anio: number | null;
  formato: string;
  sello: string | null;
  condicion: string;
  disco_del_mes: boolean;
  recien_llegado: boolean;
  destacado: boolean;
  orden_home: number;
  activo: boolean;
  creado_en: string;
}
