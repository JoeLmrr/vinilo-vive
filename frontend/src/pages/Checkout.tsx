import { motion } from 'motion/react';
import { CreditCard, Truck, ShieldCheck, ArrowLeft, Disc, ShoppingBag, Loader2, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { api } from '../services/api';

export function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [completado, setCompletado] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    direccion: '',
    ciudad: '',
    codigoPostal: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCompletarPedido = async () => {
    if (cart.length === 0) return;
    
    setCargando(true);
    try {
      // Enviar todos los datos del formulario y del carrito
      const orderData = {
        total: cartTotal,
        nombre: formData.nombre,
        email: formData.email,
        direccion: formData.direccion,
        ciudad: formData.ciudad,
        codigoPostal: formData.codigoPostal,
        items: cart.map(item => ({
          producto_id: item.id,
          cantidad: item.cantidad,
          precio_unitario: item.precio
        }))
      };

      await api.createOrder(orderData);
      setCompletado(true);
      clearCart();
      
      // Redirigir al home después de 3 segundos
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      console.error("Error al procesar el pedido:", err);
      alert("Hubo un error al procesar tu pedido. Por favor, intenta de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  if (completado) {
    return (
      <div className="bg-beige-50 min-h-screen pt-32 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-12 bg-white rounded-[3rem] shadow-2xl max-w-lg mx-4"
        >
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-4xl font-serif font-black text-brown-800 mb-4">¡Pedido Recibido!</h2>
          <p className="text-brown-600/70 text-lg mb-8">
            Tu música ya está en camino. Te hemos enviado un correo con los detalles de tu compra.
          </p>
          <Link to="/" className="inline-block px-10 py-4 bg-brown-800 text-beige-50 font-bold rounded-xl hover:bg-accent hover:text-brown-800 transition-all">
            Volver al Inicio
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-beige-50 min-h-screen pt-32 pb-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/Catalogo" className="inline-flex items-center gap-2 text-brown-600 hover:text-accent font-bold mb-12 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver al Catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Formulario de Pago (Izquierda) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-12"
          >
            <section>
              <h2 className="text-3xl font-serif font-black text-brown-800 mb-8 flex items-center gap-3">
                <Truck className="w-6 h-6 text-accent" />
                Información de Envío
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brown-600 px-1">Nombre Completo</label>
                  <input 
                    type="text" 
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-beige-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all" 
                    placeholder="Ej. Joel Mori" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brown-600 px-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-beige-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all" 
                    placeholder="joel@ejemplo.com" 
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-brown-600 px-1">Dirección de Entrega</label>
                  <input 
                    type="text" 
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-beige-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all" 
                    placeholder="Calle de los Melómanos 123" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brown-600 px-1">Ciudad</label>
                  <input 
                    type="text" 
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-beige-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all" 
                    placeholder="Lima" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brown-600 px-1">Código Postal</label>
                  <input 
                    type="text" 
                    name="codigoPostal"
                    value={formData.codigoPostal}
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-beige-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all" 
                    placeholder="15001" 
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-black text-brown-800 mb-8 flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-accent" />
                Método de Pago
              </h2>
              <div className="space-y-4">
                <div className="p-6 bg-white border-2 border-accent rounded-3xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-brown-800 rounded flex items-center justify-center">
                      <div className="w-8 h-4 bg-accent/40 rounded-sm" />
                    </div>
                    <span className="font-bold text-brown-800 tracking-tight">Tarjeta de Crédito / Débito</span>
                  </div>
                  <div className="w-6 h-6 rounded-full border-4 border-accent bg-accent" />
                </div>
                <div className="p-6 bg-beige-100 border-2 border-beige-200 rounded-3xl flex items-center justify-between opacity-60 cursor-not-allowed">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-beige-300 rounded flex items-center justify-center italic font-bold text-[10px] text-brown-600">PayPal</div>
                    <span className="font-bold text-brown-600 tracking-tight text-sm">PayPal (Próximamente)</span>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>

          {/* Resumen del Pedido (Derecha) */}
          <motion.aside 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5"
          >
            <div className="sticky top-32">
              <div className="bg-brown-800 rounded-[3rem] p-10 text-beige-50 relative overflow-hidden shadow-2xl">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
                
                <h3 className="text-2xl font-serif font-bold text-accent mb-10 uppercase tracking-widest border-b border-white/10 pb-6 flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6" />
                  Tu Colección
                </h3>

                <div className="max-h-[400px] overflow-y-auto pr-2 space-y-6 mb-12 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-6 items-center group">
                      <div className="relative w-20 h-20 shrink-0">
                        <motion.div 
                          className="absolute inset-0 bg-black rounded-full vinyl-spin opacity-50 group-hover:translate-x-2 transition-transform"
                        />
                        <img 
                          src={item.imagen_url || "https://via.placeholder.com/200"} 
                          alt={item.nombre} 
                          className="relative z-10 w-full h-full object-cover rounded-lg shadow-lg border border-white/20"
                        />
                      </div>
                      <div className="min-w-0 flex-grow">
                        <h4 className="text-lg font-serif font-black text-beige-50 leading-tight mb-1 truncate">{item.nombre}</h4>
                        <p className="text-accent italic text-sm truncate">{item.artista}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-beige-100/60 text-xs font-bold uppercase">Cant: {item.cantidad}</span>
                          <span className="text-beige-50 font-bold">S/ {(Number(item.precio) * item.cantidad).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {cart.length === 0 && (
                    <p className="text-center text-beige-100/40 italic py-10">Tu carrito está vacío</p>
                  )}
                </div>

                <div className="space-y-4 border-t border-white/10 pt-8 mb-10">
                  <div className="flex justify-between text-beige-100/60">
                    <span>Subtotal</span>
                    <span>S/ {cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-beige-100/60">
                    <span>Envío Garantizado</span>
                    <span className="text-accent">Gratis</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black text-beige-50 pt-4 border-t border-white/10">
                    <span>Total</span>
                    <span>S/ {cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCompletarPedido}
                  disabled={cargando || cart.length === 0}
                  className="w-full py-6 bg-accent text-brown-800 font-black rounded-2xl hover:bg-beige-50 transition-all uppercase tracking-widest text-sm shadow-xl shadow-black/40 mb-6 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cargando ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                  {cargando ? 'Procesando...' : 'Completar Pedido'}
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-beige-100/40 uppercase font-black tracking-[0.2em]">
                  <ShieldCheck className="w-4 h-4" />
                  Pago Seguro Encriptado
                </div>
              </div>

              <div className="mt-8 p-8 border-2 border-dashed border-beige-200 rounded-[2rem] text-center">
                <p className="text-brown-600/60 italic text-sm">
                  "El tiempo de entrega estimado es de 3-5 días hábiles para que cada surco llegue impecable a tu puerta."
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
