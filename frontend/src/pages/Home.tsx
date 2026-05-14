/**
 * @author Joe M.
 * @owner Empresa o Inc Vinilo Vive
 * @description Página principal (Home) completa. Optimizada para 2 columnas en móvil.
 */
import { motion } from 'motion/react';
import { ArrowRight, Disc, Play, Star, Coffee, Info, ShoppingCart, Percent, Zap, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Producto } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export function Home() {
  const { addToCart } = useCart();
  const [recienLlegados, setRecienLlegados] = useState<Producto[]>([]);
  const [discoDelMes, setDiscoDelMes] = useState<Producto | null>(null);
  const [destacados, setDestacados] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Cargar datos dinámicos desde la API en paralelo
    Promise.all([
      api.getDiscoDelMes(),
      api.getRecienLlegados(),
      api.getDestacados()
    ])
    .then(([disco, recien, dest]) => {
      setDiscoDelMes(disco);
      setRecienLlegados(recien);
      setDestacados(dest);
    })
    .catch(err => console.error("Error cargando datos del home:", err))
    .finally(() => setCargando(false));
  }, []);

  return (
    <div className="overflow-hidden bg-beige-50">
      {/* Sección Hero (Principal) */}
      <section id="hero" className="relative pt-16 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-accent/20 text-brown-700 rounded-full">
                Siente el Sonido Real
              </span>
              <h1 className="text-5xl lg:text-7xl font-serif font-black text-brown-800 leading-tight mb-8">
                Donde el <span className="italic text-accent">Vinilo</span> vuelve a <br /> cobrar vida.
              </h1>
              <p className="text-lg text-brown-600/80 mb-10 max-w-lg leading-relaxed">
                Explora una colección curada de joyas musicales, accesorios premium y disfruta de un café excepcional en nuestro local.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/Catalogo" className="px-8 py-4 bg-brown-800 text-beige-50 font-bold rounded-xl hover:bg-brown-700 transition-all flex items-center gap-2 group shadow-lg shadow-brown-800/20">
                  Explorar Catálogo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/Nosotros" className="px-8 py-4 border-2 border-brown-600 text-brown-800 font-bold rounded-xl hover:bg-beige-100 transition-all">
                  Conócenos
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl -z-10 transform translate-x-10 translate-y-10" />
              <div className="relative aspect-square max-w-md mx-auto">
                <motion.div
                  className="w-full h-full bg-brown-800 rounded-full flex items-center justify-center p-8 vinyl-spin"
                  style={{ boxShadow: '0 0 50px rgba(0,0,0,0.2)' }}
                >
                  <div className="w-full h-full rounded-full border-4 border-brown-700 flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full" style={{ background: 'repeating-radial-gradient(circle, transparent, transparent 2px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 4px)' }} />
                    <div className="w-32 h-32 bg-accent rounded-full border-8 border-brown-800 flex items-center justify-center">
                      <Disc className="w-16 h-16 text-brown-800" />
                    </div>
                  </div>
                </motion.div>
                <div className="absolute -top-10 -right-10 w-48 h-10 bg-gradient-to-l from-brown-600 to-brown-400 rounded-full transform rotate-45 origin-right hidden lg:block" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección de Promociones */}
      <section className="py-24 bg-beige-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-5xl lg:text-7xl font-serif font-black text-brown-800 leading-none mb-6">
                Exclusivos <br /> <span className="text-accent italic">para Coleccionistas</span>
              </h2>
              <p className="text-brown-600/70 text-lg border-l-4 border-accent pl-6 italic">
                Descubre nuestras ofertas limitadas diseñadas para los amantes del sonido más puro.
              </p>
            </div>
            <div className="hidden lg:block text-right">
              <span className="text-[100px] font-serif font-black text-beige-200/50 leading-none select-none">2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 rounded-[3rem] overflow-hidden shadow-2xl border border-beige-200">
            {/* Promo 1 */}
            <motion.div whileHover={{ backgroundColor: '#F7F1E3' }} className="bg-white p-12 flex flex-col justify-between min-h-[400px] border-b md:border-b-0 md:border-r border-beige-100 transition-colors group">
              <div>
                <span className="text-accent font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">Limited Offer</span>
                <h3 className="text-4xl font-serif font-bold text-brown-800 mb-6 group-hover:scale-105 transition-transform origin-left">Lleva 3, <br /> Paga 2</h3>
                <p className="text-brown-600/70 leading-relaxed">En toda nuestra sección de jazz y blues clásico. El tercer disco de menor valor es nuestra cortesía.</p>
              </div>
              <Link to="/Catalogo" className="flex items-center gap-3 text-brown-800 font-black text-xs uppercase tracking-widest mt-8 group">
                Ver Colección <div className="w-10 h-[2px] bg-accent group-hover:w-16 transition-all"></div>
              </Link>
            </motion.div>

            {/* Promo 2 */}
            <motion.div className="bg-accent p-12 flex flex-col justify-center items-center text-center min-h-[400px] relative group">
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                <Disc size={300} className="absolute -top-20 -left-20 text-white animate-spin-slow" />
              </div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-brown-800 rounded-full flex items-center justify-center text-accent mb-8 mx-auto shadow-xl">
                  <Percent size={32} strokeWidth={3} />
                </div>
                <h3 className="text-3xl font-serif font-bold text-white mb-4">Tu Primera Joya</h3>
                <p className="text-brown-800/60 font-bold mb-8 uppercase tracking-widest text-sm">Usa el código al finalizar</p>
                <div className="bg-white/20 backdrop-blur-md border-2 border-white/30 py-4 px-8 rounded-2xl">
                  <span className="text-4xl font-black text-brown-800 tracking-tighter">VIVE20</span>
                </div>
              </div>
            </motion.div>

            {/* Promo 3 */}
            <motion.div whileHover={{ backgroundColor: '#3D2B1F' }} className="bg-brown-800 p-12 flex flex-col justify-between min-h-[400px] transition-colors group">
              <div>
                <Gift className="text-accent mb-8 group-hover:rotate-12 transition-transform" size={40} />
                <h3 className="text-4xl font-serif font-bold text-beige-50 mb-6">Membresía <br /> VinylVive</h3>
                <p className="text-beige-100/40 leading-relaxed">Acceso a ediciones limitadas, preventas exclusivas y un disco sorpresa curado cada mes en tu puerta.</p>
              </div>
              <button className="flex items-center gap-3 text-accent font-black text-xs uppercase tracking-widest mt-8 group">
                Unirme al Club <div className="w-10 h-[2px] bg-white/20 group-hover:bg-accent transition-all"></div>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección Recién Llegados - OPTIMIZADA 2 COLUMNAS MÓVIL */}
      {recienLlegados.length > 0 && (
        <section className="py-24 bg-beige-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl font-serif font-bold text-brown-800 mb-4">Recién Llegados</h2>
                <p className="text-brown-600/70">Las últimas adiciones a nuestra biblioteca analógica.</p>
              </div>
              <Link to="/Catalogo" className="text-accent font-bold hover:underline flex items-center gap-1 group">
                Ver todo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {recienLlegados.map((item, idx) => (
                <ProductCard key={item.id} producto={item} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sección Disco del Mes */}
      {discoDelMes && (
        <section className="py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-brown-800 rounded-[3rem] p-8 lg:p-16 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative z-10 order-2 lg:order-1">
                  <div className="flex items-center gap-2 text-accent mb-6">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-bold tracking-widest uppercase text-sm">Disco del Mes</span>
                  </div>
                  <h2 className="text-4xl lg:text-6xl font-serif font-bold text-beige-50 mb-6">{discoDelMes.nombre}</h2>
                  <p className="text-2xl text-accent mb-6 italic">{discoDelMes.artista}</p>
                  <p className="text-beige-100/70 text-lg mb-8 leading-relaxed max-w-lg">
                    {discoDelMes.descripcion_larga || discoDelMes.descripcion}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {discoDelMes.genero && <span className="text-xs bg-white/10 text-beige-100 px-3 py-1 rounded-full border border-white/20">{discoDelMes.genero}</span>}
                    {discoDelMes.formato && <span className="text-xs bg-white/10 text-beige-100 px-3 py-1 rounded-full border border-white/20">{discoDelMes.formato}</span>}
                  </div>
                  <div className="flex items-center gap-8 mb-10">
                    <div className="text-beige-50 font-bold text-3xl">S/ {Number(discoDelMes.precio).toFixed(2)}</div>
                  </div>
                  <button 
                    onClick={() => addToCart(discoDelMes)}
                    className="px-10 py-4 bg-accent text-brown-800 font-bold rounded-xl hover:bg-beige-50 transition-all shadow-xl shadow-black/20 flex items-center gap-2"
                    disabled={discoDelMes.stock <= 0}
                  >
                    <ShoppingCart size={20} />
                    {discoDelMes.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
                  </button>
                </div>
                <motion.div className="order-1 lg:order-2" initial={{ rotate: 5, scale: 0.9 }} whileInView={{ rotate: 0, scale: 1 }} viewport={{ once: true }}>
                  <img src={discoDelMes.imagen_url || 'https://via.placeholder.com/600'} alt={discoDelMes.nombre} className="w-full rounded-2xl shadow-2xl" referrerPolicy="no-referrer" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Destacados - OPTIMIZADA 2 COLUMNAS MÓVIL */}
      {destacados.length > 0 && (
        <section className="py-24 bg-beige-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif font-bold text-brown-800 mb-12">Selección Destacada</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
              {destacados.slice(0, 3).map((producto, indice) => (
                <ProductCard key={producto.id} producto={producto} index={indice} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sección Explorar Colección (CTA) */}
      <section className="py-24 bg-beige-100 border-t border-beige-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px]">
            <motion.div whileHover={{ scale: 0.98 }} className="md:col-span-2 lg:row-span-2 bg-brown-800 rounded-[2.5rem] p-12 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none vinyl-spin">
                <Disc className="w-full h-full scale-150" />
              </div>
              <div className="relative z-10">
                <h2 className="text-4xl lg:text-6xl font-serif font-black text-beige-50 mb-6 leading-none">Explora el <br /><span className="text-accent italic">Universo</span> Sonoro</h2>
                <p className="text-beige-100/60 text-lg max-w-sm mb-8">Más de 5,000 títulos esperando ser descubiertos.</p>
              </div>
              <Link to="/Catalogo" className="relative z-10 w-fit px-8 py-4 bg-accent text-brown-800 font-bold rounded-2xl hover:bg-beige-50 transition-all flex items-center gap-3 group/btn">
                Ver Catálogo Completo <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
            <div className="md:col-span-1 bg-beige-200 rounded-[2.5rem] p-8 flex flex-col justify-end group cursor-pointer overflow-hidden relative shadow-lg">
              <img src="https://images.unsplash.com/photo-1539375665275-f9ad415ef9ac?w=400" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40" />
              <h3 className="relative z-10 text-2xl font-serif font-bold text-brown-800">Jazz & Soul</h3>
            </div>
            <div className="md:col-span-1 bg-accent/20 rounded-[2.5rem] p-8 flex flex-col justify-end group cursor-pointer overflow-hidden relative shadow-lg">
              <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-30" />
              <h3 className="relative z-10 text-2xl font-serif font-bold text-brown-800">Rock Alternativo</h3>
            </div>
            <div className="md:col-span-2 bg-beige-50 border-2 border-beige-200 rounded-[2.5rem] p-10 flex items-center justify-between group cursor-pointer hover:border-accent transition-colors shadow-lg">
              <div>
                <h3 className="text-3xl font-serif font-bold text-brown-800 mb-2">¿Buscas algo específico?</h3>
                <p className="text-brown-600/70">Prueba nuestro buscador en el catálogo</p>
              </div>
              <div className="w-16 h-16 bg-brown-800 rounded-full flex items-center justify-center text-beige-100 group-hover:bg-accent transition-colors">
                <Play className="w-6 h-6 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Mucho más que una Tienda (La Experiencia) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-serif font-bold text-brown-800 mb-6">Mucho más que una Tienda</h2>
            <p className="text-lg text-brown-600/80">En Vinilo Vive creemos que la música se vive mejor con los cinco sentidos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { titulo: "Zonas de Escucha", desc: "Prueba cualquier disco antes de llevarlo.", icon: <Disc className="w-8 h-8" /> },
              { titulo: "Barra de Café", desc: "Granos de origen tostados localmente.", icon: <Coffee className="w-8 h-8" /> },
              { titulo: "Comunidad", desc: "Eventos mensuales y sesiones de escucha.", icon: <Info className="w-8 h-8" /> }
            ].map((item, idx) => (
              <motion.div key={idx} whileHover={{ y: -10 }} className="bg-beige-100 p-10 rounded-3xl border border-beige-200 transition-all">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mb-8">{item.icon}</div>
                <h3 className="text-2xl font-serif font-bold text-brown-800 mb-4">{item.titulo}</h3>
                <p className="text-brown-600/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
