import { Link, useLocation } from 'react-router-dom';
import { Disc, Coffee, Info, ShoppingBag, Music2, Home, ShoppingCart, X, Plus, Minus, Trash2, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Navbar() {
  const ubicacion = useLocation();
  const { cart, cartCount, cartTotal, updateQuantity, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const elementosNavegacion = [
    { nombre: 'Casa', ruta: '/Casa', icono: <Home className="w-4 h-4" /> },
    { nombre: 'Catálogo', ruta: '/Catalogo', icono: <Music2 className="w-4 h-4" /> },
    { nombre: 'Accesorios', ruta: '/Accesorios', icono: <ShoppingBag className="w-4 h-4" /> },
    { nombre: 'Carta Café', ruta: '/CartaCafe', icono: <Coffee className="w-4 h-4" /> },
    { nombre: 'Nosotros', ruta: '/Nosotros', icono: <Info className="w-4 h-4" /> },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-beige-50/80 backdrop-blur-md border-b border-beige-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group z-50">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <Disc className="w-10 h-10 text-brown-600" />
              </motion.div>
              <span className="text-2xl font-serif font-bold tracking-tight text-brown-800">
                Vinilo <span className="text-accent underline decoration-2 underline-offset-4">Vive</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {elementosNavegacion.map((elemento) => {
                const estaActivo = ubicacion.pathname === elemento.ruta || (elemento.ruta === '/Casa' && ubicacion.pathname === '/');
                return (
                  <Link
                    key={elemento.nombre}
                    to={elemento.ruta}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium transition-colors hover:text-brown-600 relative py-2",
                      estaActivo ? "text-brown-800" : "text-brown-600/60"
                    )}
                  >
                    {elemento.icono}
                    {elemento.nombre}
                    {estaActivo && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Icons (Cart & Mobile Menu) */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-brown-800 hover:text-accent transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-brown-800 text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              <button 
                className="md:hidden p-2 text-brown-800"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {/* Cambio de Disc por Menu para mejor representación visual */}
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-brown-600" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-beige-200 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {elementosNavegacion.map((elemento) => (
                  <Link
                    key={elemento.nombre}
                    to={elemento.ruta}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 text-lg font-medium text-brown-800 hover:text-accent py-2"
                  >
                    {elemento.icono}
                    {elemento.nombre}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-beige-50 shadow-2xl z-[70] flex flex-col"
            >
              <div className="p-6 border-b border-beige-200 flex justify-between items-center bg-white">
                <h2 className="text-2xl font-serif font-bold text-brown-800 flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6" />
                  Tu Carrito
                </h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-beige-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-brown-600" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-beige-100 group">
                      <div className="w-20 h-20 shrink-0 overflow-hidden rounded-lg">
                        <img 
                          src={item.imagen_url || "https://via.placeholder.com/200"} 
                          alt={item.nombre}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-brown-800 truncate">{item.nombre}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-3 truncate">{item.artista}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3 bg-beige-100 rounded-lg p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-white rounded transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-bold w-4 text-center">{item.cantidad}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-white rounded transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-bold text-brown-800">S/ {(Number(item.precio) * item.cantidad).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                    <Disc className="w-20 h-20 animate-spin-slow" />
                    <p className="text-lg font-medium italic">Tu colección está esperando nuevas joyas...</p>
                  </div>
                )}
              </div>

              <div className="p-8 bg-white border-t border-beige-200 space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-gray-500 font-medium">Total Estimado</span>
                  <span className="text-3xl font-serif font-black text-brown-800">S/ {cartTotal.toFixed(2)}</span>
                </div>
                <Link 
                  to="/Checkout"
                  onClick={() => setIsCartOpen(false)}
                  className={cn(
                    "w-full py-5 rounded-2xl font-black uppercase tracking-widest text-center block transition-all shadow-xl",
                    cart.length > 0 
                      ? "bg-brown-800 text-beige-50 hover:bg-accent hover:text-brown-800 shadow-brown-800/20" 
                      : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                  )}
                >
                  Finalizar Compra
                </Link>
                <p className="text-[10px] text-center text-gray-400 uppercase font-bold tracking-widest">
                  Envío gratis a todo el país en pedidos de vinilos
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
