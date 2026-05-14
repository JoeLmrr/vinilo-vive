/**
 * @description Página que muestra la Carta del Café de la tienda.
 */
import { motion } from 'motion/react';
import { Coffee, Croissant, Moon, Sun } from 'lucide-react';

const MENU_CAFE = [
  {
    categoria: "Bebidas calientes",
    icono: <Sun className="w-5 h-5" />,
    articulos: [
      { nombre: "Americano", precio: "S/ 8.00", descripcion: "Café intenso y equilibrado." },
      { nombre: "Capuccino", precio: "S/ 11.00", descripcion: "Café cremoso con espuma de leche." },
      { nombre: "Latte", precio: "S/ 11.00", descripcion: "Espresso suave con leche sedosa." },
      { nombre: "Te de frutos rojos", precio: "S/ 6.00", descripcion: "Infusión dulce y frutal." },
      { nombre: "Te de jamaica", precio: "S/ 6.00", descripcion: "Refrescante y ligeramente ácida." },
    ]
  },
  {
    categoria: "Bebidas Frias",
    icono: <Moon className="w-5 h-5" />,
    articulos: [
      { nombre: "Ice tea de futos rojos", precio: "S/ 10.00", descripcion: "Té frío afrutado y aromático." },
      { nombre: "Ice tea de futos jamaica", precio: "S/ 10.00", descripcion: "Té frío cítrico y refrescante." },
      { nombre: "IncaKola - CocaCola", precio: "S/ 5.00", descripcion: "Bebida refrescante" },
    ]
  },
  {
    categoria: "Aperitivos",
    icono: <Croissant className="w-5 h-5" />,
    articulos: [
      { nombre: "Choripan de la casa", precio: "S/ 7.50", descripcion: "Aperitivo artesanal y crujiente." },
      { nombre: "Croissant de pollo", precio: "S/ 11.00", descripcion: "Croissant relleno de pollo.." },
      { nombre: "Croissant de jamón y queso", precio: "S/ 11.00", descripcion: "Croissant clásico de jamón y queso." },
      { nombre: "Croissant dulce", precio: "S/ 11.00", descripcion: "Croissant suave con toque dulce." },
      { nombre: "Porción de pizza artesanal", precio: "S/ 7.50", descripcion: "Pizza artesanal de masa crujiente." },

    ]
  }
];

export function CafeMenu() {
  return (
    <div className="py-20 bg-beige-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-20">
          <div className="inline-block p-4 bg-accent/20 text-accent rounded-full mb-6">
            <Coffee className="w-10 h-10" />
          </div>
          <h1 className="text-5xl font-serif font-black text-brown-800 mb-6 tracking-tight"> <span className="text-accent underline">Carta Café</span></h1>
          <p className="text-lg text-brown-600/70 max-w-lg mx-auto">
            Disfruta una selección de cafés de especialidad, bebidas refrescantes y aperitivos artesanales preparados para acompañar cada momento.
          </p>
        </header>

        <div className="bg-white rounded-[3rem] p-8 lg:p-16 shadow-2xl shadow-brown-800/5 relative overflow-hidden">
          {/* Fondo del menú */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-beige-100/50 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-beige-100/50 rounded-full -ml-24 -mb-24" />

          {MENU_CAFE.map((seccion, sidx) => (
            <motion.div 
              key={seccion.categoria}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sidx * 0.1 }}
              className="mb-16 last:mb-0 relative z-10"
            >
              <div className="flex items-center gap-3 mb-8 border-b border-beige-200 pb-4">
                <span className="text-accent">{seccion.icono}</span>
                <h2 className="text-2xl font-serif font-bold text-brown-800 italic uppercase tracking-widest leading-none">
                  {seccion.categoria}
                </h2>
              </div>

              <div className="space-y-10">
                {seccion.articulos.map((articulo, iidx) => (
                  <div key={articulo.nombre} className="flex justify-between items-start group">
                    <div className="flex-grow pr-8">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-xl font-bold text-brown-800 group-hover:text-accent transition-colors">{articulo.nombre}</h3>
                        <div className="flex-grow border-b border-dotted border-beige-300 transform translate-y-1 group-hover:border-accent transition-colors" />
                      </div>
                      <p className="text-brown-600/70 text-sm italic">{articulo.descripcion}</p>
                    </div>
                    <span className="font-serif font-black text-xl text-brown-800">{articulo.precio}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
          
          <div className="mt-16 text-center border-t border-beige-200 pt-12">
            <p className="font-serif italic text-brown-800/60 mb-8 max-w-sm mx-auto">"La música suena mejor después de un sorbo de buen café"</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-accent/40" />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}