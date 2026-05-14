/**
 * @description Página de Accesorios para el cuidado y mantenimiento de discos y equipos.
 */
import { motion } from 'motion/react';
import { Package, SprayCan as Spray, Wrench, ShoppingCart, Star, Shield, Zap } from 'lucide-react';

const CATEGORIAS_ACCESORIOS = [
  { 
    id: 'polos', 
    nombre: 'Polos & Merch', 
    descripcion: 'Viste tu pasión con diseños exclusivos de edición limitada.',
    icono: <Package className="w-6 h-6" />,
    color: 'bg-orange-100',
    articulos: [
      { id: 101, nombre: "Vinilo Vive Classic Tee", precio: "S/25.00", etiqueta: "Más Vendido", imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500", detalle: "Algodón 100% Orgánico" },
      { id: 102, nombre: "Analog Soul Hoodie", precio: "S/45.00", etiqueta: "Premium", imagen: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=500", detalle: "Oversized Fit" }
    ]
  },
  { 
    id: 'limpiadores', 
    nombre: 'Mantenimiento & Guardado', 
    descripcion: 'El cuidado que tus joyas analógicas merecen.',
    icono: <Spray className="w-6 h-6" />,
    color: 'bg-blue-100',
    articulos: [
      { id: 201, nombre: "Anti-Static Fluid Kit", precio: "S/18.00", etiqueta: "Esencial", imagen: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=500", detalle: "Sin alcohol, secado rápido" },
      { id: 202, nombre: "Carbon Fiber Brush", precio: "S/12.00", imagen: "https://images.unsplash.com/photo-1619983081563-430f63602796?auto=format&fit=crop&q=80&w=500", detalle: "Cerdas ultra-finas" }
    ]
  },
  { 
    id: 'repuestos', 
    nombre: 'Técnica & Repuestos', 
    descripcion: 'Mantén tu tornamesa en perfectas condiciones de afinación.',
    icono: <Wrench className="w-6 h-6" />,
    color: 'bg-stone-200',
    articulos: [
      { id: 301, nombre: "Stylus Replacement XL", precio: "S/55.00", etiqueta: "Alta Gama", imagen: "https://images.unsplash.com/photo-1544322432-843e931f608a?auto=format&fit=crop&q=80&w=500", detalle: "Punta de Diamante" },
      { id: 302, nombre: "Belt Drive Replacement", precio: "S/15.00", imagen: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=500", detalle: "Goma de alta densidad" }
    ]
  }
];

export function Accessories() {
  return (
    <div className="bg-beige-50 min-h-screen">
      {/* Cabecera Premium */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="h-0.5 w-12 bg-accent"></span>
                <span className="text-sm font-bold uppercase tracking-widest text-accent">Esenciales Analógicos</span>
              </div>
              <h1 className="text-6xl lg:text-8xl font-serif font-black text-brown-800 leading-none mb-8">
                Cuida tu <br /> <span className="text-accent underline decoration-8 underline-offset-8 italic">Ritual</span>.
              </h1>
              <p className="text-xl text-brown-600/70 max-w-sm leading-relaxed mb-10">
                La calidad del sonido comienza en el cuidado. Descubre nuestra selección curada de accesorios premium.
              </p>
              <div className="flex gap-8">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-brown-400" />
                  <span className="text-xs font-bold text-brown-800 uppercase">Calidad Certificada</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-brown-400" />
                  <span className="text-xs font-bold text-brown-800 uppercase">Envíos Express</span>
                </div>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-accent/20 rounded-[4rem] blur-3xl" />
              <img 
                src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800" 
                className="relative z-10 w-full aspect-[4/3] object-cover rounded-[3rem] shadow-2xl skew-x-1"
                alt="Accesorios"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Secciones de Categorías */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 pb-40">
        {CATEGORIAS_ACCESORIOS.map((categoria, idx) => (
          <motion.section 
            key={categoria.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-xl">
                <div className={`w-14 h-14 ${categoria.color} rounded-2xl flex items-center justify-center text-brown-800 mb-6`}>
                  {categoria.icono}
                </div>
                <h2 className="text-4xl lg:text-5xl font-serif font-black text-brown-800 mb-4 tracking-tighter">
                  {categoria.nombre}
                </h2>
                <p className="text-lg text-brown-600/70 italic">"{categoria.descripcion}"</p>
              </div>
              <div className="flex-shrink-0">
                <button className="px-6 py-2 border-2 border-brown-200 text-brown-600 rounded-full font-bold hover:border-accent hover:text-accent transition-all">
                  Ver Todo {categoria.nombre}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {categoria.articulos.map((articulo, idy) => (
                <motion.div
                  key={articulo.id}
                  whileHover={{ y: -10 }}
                  className="group relative flex flex-col sm:flex-row bg-white rounded-[3rem] overflow-hidden border border-beige-200 shadow-sm hover:shadow-2xl hover:shadow-brown-600/10 transition-all duration-500"
                >
                  <div className="sm:w-1/2 aspect-square overflow-hidden relative">
                    <img 
                      src={articulo.imagen} 
                      alt={articulo.nombre} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    {articulo.etiqueta && (
                      <span className="absolute top-6 left-6 px-4 py-1.5 bg-accent text-brown-800 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                        {articulo.etiqueta}
                      </span>
                    )}
                  </div>
                  
                  <div className="sm:w-1/2 p-10 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-brown-800 mb-2 group-hover:text-accent transition-colors leading-tight">
                        {articulo.nombre}
                      </h3>
                      <p className="text-sm text-brown-600/60 mb-8 border-l-2 border-beige-100 pl-4">{articulo.detalle}</p>
                      
                      <div className="flex items-center gap-1 mb-12">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star key={i} className="w-3 h-3 text-accent fill-current" />
                        ))}
                        <span className="text-[10px] font-bold text-brown-400 ml-2">(48 reseñas)</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-black text-brown-800">{articulo.precio}</span>
                      <button className="p-4 bg-brown-800 text-beige-50 rounded-2xl hover:bg-accent transition-all hover:scale-110 shadow-lg group-hover:bg-accent">
                        <ShoppingCart className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      {/* Banner Destacado */}
      <section className="bg-brown-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-beige-50 mb-8">¿No encuentras lo que buscas?</h2>
          <p className="text-beige-100/60 mb-10 max-w-lg mx-auto italic">Pregunta a nuestros expertos sobre repuestos específicos para modelos clásicos de tornamesas.</p>
          <button className="px-12 py-5 bg-accent text-brown-800 font-black rounded-2xl hover:bg-beige-50 transition-all uppercase tracking-widest text-sm shadow-xl shadow-black/30">
            Consultar con un Experto
          </button>
        </div>
      </section>
    </div>
  );
}