/**
 * @author Joe M.
 * @owner Vinilo Vive
 * @description Página de detalle de producto. Carga datos reales desde el backend (Supabase).
 */
import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Disc, ShoppingCart, ArrowLeft, Star, Heart, Share2,
  Play, Info, Music, Loader2, AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import { Producto } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [relacionados, setRelacionados] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [agregado, setAgregado] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;
    setCargando(true);
    setError(null);

    api.getProductoById(id)
      .then(async (data) => {
        setProducto(data);
        // Cargar productos del mismo género como relacionados
        try {
          const todos = await api.getProductos(data.genero);
          // Excluir el producto actual y limitar a 3
          setRelacionados(todos.filter(p => String(p.id) !== String(data.id)).slice(0, 3));
        } catch {
          // Relacionados es opcional — si falla no bloqueamos
        }
      })
      .catch(() => setError("No pudimos encontrar este disco. Puede que no exista o esté temporalmente no disponible."))
      .finally(() => setCargando(false));
  }, [id]);

  const handleAgregarCarrito = () => {
    if (producto) {
      addToCart(producto);
      setAgregado(true);
      setTimeout(() => setAgregado(false), 2000);
    }
  };

  // ─── Estados de carga y error ──────────────────────────────────────────────
  if (cargando) {
    return (
      <div className="bg-beige-50 min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-accent animate-spin mx-auto mb-4" />
          <p className="text-brown-600 font-medium">Cargando disco...</p>
        </div>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="bg-beige-50 min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-brown-800 mb-2">Disco no encontrado</h2>
          <p className="text-brown-600/70 mb-6">{error || "Lo sentimos, no pudimos cargar la información de este disco."}</p>
          <Link to="/Catalogo" className="inline-flex items-center gap-2 px-6 py-3 bg-brown-800 text-beige-50 font-bold rounded-xl hover:bg-accent hover:text-brown-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  // ─── Helpers para mostrar campos opcionales con seguridad ──────────────────
  const getVelocidad = () => {
    if (!producto.formato) return '33 1/3 RPM';
    return producto.formato.toUpperCase().includes('45') ? '45 RPM' : '33 1/3 RPM';
  };

  const getPeso = () => {
    if (!producto.formato) return '140g';
    return producto.formato.toUpperCase().includes('180') ? '180g' : '140g';
  };

  const velocidad = getVelocidad();
  const peso = getPeso();
  const descripcionLarga = producto.descripcion_larga || producto.descripcion || "Sin descripción disponible.";

  return (
    <div className="bg-beige-50 min-h-screen pt-32 pb-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Breadcrumbs ─────────────────────────────────────────────────── */}
        <div className="flex justify-between items-center mb-12">
          <Link
            to="/Catalogo"
            className="inline-flex items-center gap-2 text-brown-600 hover:text-accent font-bold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver a la Biblioteca
          </Link>
          <div className="flex gap-4">
            <button className="p-3 bg-white border border-beige-200 rounded-full text-brown-400 hover:text-red-500 transition-all shadow-sm">
              <Heart className="w-5 h-5" />
            </button>
            <button
              className="p-3 bg-white border border-beige-200 rounded-full text-brown-400 hover:text-accent transition-all shadow-sm"
              onClick={() => navigator.share?.({ title: producto.nombre, url: window.location.href })}
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Contenido principal ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">

          {/* Imagen y specs rápidos (izquierda) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-6 relative group"
          >
            <div className="relative aspect-square">
              {/* Vinilo peek */}
              <motion.div className="absolute top-0 right-0 w-full h-full bg-black rounded-full -z-10 vinyl-spin group-hover:translate-x-1/2 transition-transform duration-1000 ease-in-out border-[12px] border-neutral-900 shadow-2xl flex items-center justify-center">
                <div className="w-full h-full rounded-full border border-white/5 flex items-center justify-center p-20">
                  <div className="w-32 h-32 bg-accent/40 rounded-full border-4 border-white/10" />
                </div>
              </motion.div>

              {/* Portada del álbum */}
              <div className="bg-white p-4 rounded-lg shadow-2xl relative z-10">
                <img
                  src={producto.imagen_url || 'https://via.placeholder.com/600'}
                  alt={producto.nombre}
                  className="w-full aspect-square object-cover rounded shadow-inner"
                  referrerPolicy="no-referrer"
                />
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center gap-1 text-accent">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                  </div>
                  {producto.condicion && (
                    <span className="text-[10px] uppercase font-black tracking-widest text-brown-300">
                      {producto.condicion}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Specs rápidos */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="bg-white/50 p-6 rounded-3xl border border-beige-200 text-center">
                <Music className="w-5 h-5 text-accent mx-auto mb-2" />
                <div className="text-[10px] uppercase font-bold text-brown-400 mb-1">Peso</div>
                <div className="font-bold text-brown-800 text-sm">{peso}</div>
              </div>
              <div className="bg-white/50 p-6 rounded-3xl border border-beige-200 text-center">
                <Disc className="w-5 h-5 text-accent mx-auto mb-2" />
                <div className="text-[10px] uppercase font-bold text-brown-400 mb-1">Velocidad</div>
                <div className="font-bold text-brown-800 text-sm">{velocidad}</div>
              </div>
              <div className="bg-white/50 p-6 rounded-3xl border border-beige-200 text-center">
                <Info className="w-5 h-5 text-accent mx-auto mb-2" />
                <div className="text-[10px] uppercase font-bold text-brown-400 mb-1">Estado</div>
                <div className="font-bold text-brown-800 text-sm">{producto.condicion || '—'}</div>
              </div>
            </div>
          </motion.div>

          {/* Detalles (derecha) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-end"
          >
            <div className="mb-10">
              {/* Badges de género y año */}
              <div className="flex flex-wrap gap-2 mb-6">
                {producto.genero && (
                  <span className="px-4 py-1.5 bg-accent/20 text-accent rounded-full text-xs font-black uppercase tracking-widest">
                    {producto.genero}
                  </span>
                )}
                {producto.anio && (
                  <span className="px-4 py-1.5 bg-beige-200 text-brown-600 rounded-full text-xs font-black uppercase tracking-widest">
                    {producto.anio}
                  </span>
                )}
                {producto.formato && (
                  <span className="px-4 py-1.5 bg-beige-200 text-brown-600 rounded-full text-xs font-black uppercase tracking-widest">
                    {producto.formato}
                  </span>
                )}
              </div>

              <h1 className="text-5xl lg:text-7xl font-serif font-black text-brown-800 leading-none mb-4">
                {producto.nombre}
              </h1>
              <p className="text-3xl italic text-brown-600 font-serif mb-4 border-l-4 border-accent pl-6">
                {producto.artista}
              </p>

              {/* Sello discográfico */}
              {producto.sello && (
                <p className="text-sm text-brown-400 font-medium mb-6 pl-6">
                  {producto.sello}
                </p>
              )}

              <p className="text-lg text-brown-600/70 leading-relaxed mb-10 max-w-xl">
                {descripcionLarga}
              </p>
            </div>

            {/* Caja de compra */}
            <div className="bg-white p-8 lg:p-12 rounded-[3.5rem] border border-beige-200 shadow-xl shadow-brown-800/5 mb-10">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <div className="text-sm font-bold text-brown-400 uppercase tracking-widest mb-1">Precio Final</div>
                  <div className="text-5xl font-black text-brown-800">
                    S/ {Number(producto.precio).toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  {producto.stock > 0 ? (
                    <>
                      <div className="text-sm font-bold text-green-600 uppercase tracking-widest mb-1">Disponible</div>
                      <div className="text-brown-600 text-sm italic">{producto.stock} en stock</div>
                    </>
                  ) : (
                    <div className="text-sm font-bold text-red-500 uppercase tracking-widest">Agotado</div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAgregarCarrito}
                  disabled={producto.stock <= 0}
                  className={`flex-grow py-5 font-black rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl text-lg uppercase tracking-widest ${
                    producto.stock > 0
                      ? agregado
                        ? 'bg-green-600 text-white'
                        : 'bg-brown-800 text-beige-50 hover:bg-brown-700 shadow-brown-800/20'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {agregado ? '¡Agregado!' : producto.stock > 0 ? 'Lo quiero ahora' : 'Agotado'}
                </button>
              </div>
            </div>

            {/* Información adicional del disco */}
            <div className="bg-beige-100 rounded-3xl p-6 border border-beige-200">
              <h3 className="font-serif font-bold text-brown-800 mb-4 flex items-center gap-2">
                <Play className="w-4 h-4 text-accent fill-current" />
                Información del Disco
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {producto.artista && (
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-brown-400 block mb-0.5">Artista</span>
                    <span className="font-bold text-brown-800">{producto.artista}</span>
                  </div>
                )}
                {producto.anio && (
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-brown-400 block mb-0.5">Año</span>
                    <span className="font-bold text-brown-800">{producto.anio}</span>
                  </div>
                )}
                {producto.sello && (
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-brown-400 block mb-0.5">Sello</span>
                    <span className="font-bold text-brown-800">{producto.sello}</span>
                  </div>
                )}
                {producto.formato && (
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-brown-400 block mb-0.5">Formato</span>
                    <span className="font-bold text-brown-800">{producto.formato}</span>
                  </div>
                )}
                {producto.genero && (
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-brown-400 block mb-0.5">Género</span>
                    <span className="font-bold text-brown-800">{producto.genero}</span>
                  </div>
                )}
                {producto.condicion && (
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-brown-400 block mb-0.5">Condición</span>
                    <span className="font-bold text-brown-800">{producto.condicion}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Productos Relacionados ───────────────────────────────────────── */}
        {relacionados.length > 0 && (
          <section className="pt-24 border-t border-beige-200">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl font-serif font-black text-brown-800 mb-4">
                  También te podría <span className="italic text-accent">gustar</span>
                </h2>
                <p className="text-brown-600/70">Otras joyas analógicas del mismo género.</p>
              </div>
              <Link to={`/Catalogo?genero=${encodeURIComponent(producto.genero)}`} className="text-accent font-bold hover:underline text-sm">
                Ver más de {producto.genero}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relacionados.map((p, idx) => (
                <ProductCard key={p.id} producto={p} index={idx} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
