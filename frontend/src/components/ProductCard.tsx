
/**
 * @description Componente de tarjeta de producto optimizado para grids de 2 columnas en móvil.
 */
import { motion } from 'motion/react';
import { ShoppingCart } from 'lucide-react';
import { Producto } from '../types/product';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  producto: Producto;
  index?: number;
}

export function ProductCard({ producto, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const [agregado, setAgregado] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(producto);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="h-full"
    >
      {/* EXPLICACIÓN: Se cambió p-4 por p-3 en móvil para ganar espacio interno */}
      <div className="bg-white rounded-xl shadow p-3 md:p-4 hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
        
        {/* Imagen del Disco - EXPLICACIÓN: aspect-square asegura que todas las portadas midan lo mismo */}
        <Link to={`/Producto/${producto.id}`} className="relative aspect-square overflow-hidden rounded mb-3 md:mb-4 bg-beige-100 block">
          <img
            src={producto.imagen_url || 'https://via.placeholder.com/400'}
            alt={producto.nombre}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          {/* Badge de condición - EXPLICACIÓN: Texto más pequeño (text-[8px]) en móvil */}
          {producto.condicion && (
            <span className="absolute top-1.5 right-1.5 bg-black/80 text-white text-[8px] md:text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold z-10">
              {producto.condicion}
            </span>
          )}
        </Link>

        {/* Información del Disco */}
        <div className="flex-grow flex flex-col">
          <Link to={`/Producto/${producto.id}`} className="hover:text-accent transition-colors">
            {/* EXPLICACIÓN: text-sm en móvil evita que el título ocupe 3 líneas */}
            <h3 className="text-sm md:text-xl font-bold text-brown-800 line-clamp-1" title={producto.nombre}>
              {producto.nombre}
            </h3>
          </Link>
          <p className="text-[10px] md:text-sm text-gray-500 mb-1">{producto.artista}</p>
          
          {/* EXPLICACIÓN: 'hidden md:flex' oculta géneros y descripción en móvil para mantener la tarjeta compacta */}
          <div className="hidden md:flex flex-wrap gap-1 mt-2 mb-3">
            {producto.genero && <span className="text-[10px] bg-beige-200 text-brown-600 px-2 py-1 rounded font-bold uppercase">{producto.genero}</span>}
            {producto.formato && <span className="text-[10px] bg-beige-200 text-brown-600 px-2 py-1 rounded font-bold uppercase">{producto.formato}</span>}
          </div>
          
          <p className="hidden md:line-clamp-2 text-xs text-gray-500 mb-4 flex-grow" title={producto.descripcion}>
            {producto.descripcion}
          </p>
        </div>

        {/* Precio y Botón - EXPLICACIÓN: Gap-2 y flex-col en móvil para que el botón no aplaste el precio */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-3 border-t border-beige-100 mt-auto gap-2">
          <span className="font-bold text-base md:text-xl text-brown-800">
            S/ {Number(producto.precio).toFixed(2)}
          </span>

          <button 
            onClick={handleAddToCart}
            className={`w-full sm:w-auto px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-xs md:text-sm ${
              producto.stock > 0 
                ? agregado 
                  ? "bg-green-600 text-white" 
                  : "bg-brown-800 text-white hover:bg-accent hover:text-brown-800 shadow-md active:scale-95" 
                : "bg-gray-300
