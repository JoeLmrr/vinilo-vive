import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  AlertTriangle,
  ArrowUpRight,
  Plus,
  Database,
  ClipboardList
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminHome = () => {
  const [stats, setStats] = useState({
    totalProductos: 0,
    totalOrdenes: 0,
    totalVentas: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.getAdminStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { 
      label: 'Productos Activos', 
      value: stats.totalProductos, 
      icon: Package, 
      color: 'bg-brown-600', 
      detail: 'En el catálogo actual' 
    },
    { 
      label: 'Total Órdenes', 
      value: stats.totalOrdenes, 
      icon: ShoppingCart, 
      color: 'bg-accent', 
      detail: 'Histórico de ventas' 
    },
    { 
      label: 'Ventas Totales', 
      value: `$${(Number(stats.totalVentas) || 0).toLocaleString()}`, 
      icon: TrendingUp, 
      color: 'bg-brown-800', 
      detail: 'Ingresos generados' 
    },
    { 
      label: 'Stock Bajo', 
      value: '5', 
      icon: AlertTriangle, 
      color: 'bg-red-500', 
      detail: 'Requieren atención' 
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brown-800 font-serif">Resumen del Panel</h1>
          <p className="text-brown-600 mt-1">Bienvenido de nuevo. Aquí tienes un vistazo rápido de tu tienda.</p>
        </div>
        <Link 
          to="/admin/dashboard/productos" 
          className="flex items-center gap-2 bg-brown-700 hover:bg-brown-800 text-white px-6 py-3 rounded-xl transition-all shadow-lg shadow-brown-900/10 font-semibold"
        >
          <Plus className="w-5 h-5" />
          Nuevo Producto
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-beige-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between mb-4">
              <div className={`${card.color} p-3 rounded-xl text-white shadow-lg`}>
                <card.icon className="w-6 h-6" />
              </div>
              <div className="bg-beige-50 p-1 rounded-lg group-hover:bg-beige-100 transition-colors">
                <ArrowUpRight className="w-5 h-5 text-brown-600 group-hover:text-accent" />
              </div>
            </div>
            <h3 className="text-brown-600 text-sm font-medium">{card.label}</h3>
            <p className="text-2xl font-bold text-brown-800 mt-1">{card.value}</p>
            <p className="text-xs text-brown-400 mt-2 flex items-center gap-1">
              {card.detail}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-beige-100 shadow-sm">
          <h2 className="text-xl font-bold text-brown-800 mb-6 font-serif">Acciones Rápidas</h2>
          <div className="grid grid-cols-3 gap-4">
            <Link to="/admin/dashboard/productos" className="flex flex-col items-center justify-center p-6 bg-beige-50 rounded-xl hover:bg-beige-100 hover:text-brown-800 transition-all border border-transparent hover:border-beige-200 group text-center">
              <Package className="w-8 h-8 mb-3 text-brown-400 group-hover:text-accent" />
              <span className="font-semibold text-xs sm:text-sm">Catálogo</span>
            </Link>
            <Link to="/admin/dashboard/inventario" className="flex flex-col items-center justify-center p-6 bg-beige-50 rounded-xl hover:bg-beige-100 hover:text-brown-800 transition-all border border-transparent hover:border-beige-200 group text-center">
              <Database className="w-8 h-8 mb-3 text-brown-400 group-hover:text-accent" />
              <span className="font-semibold text-xs sm:text-sm">Stock</span>
            </Link>
            <Link to="/admin/dashboard/ordenes" className="flex flex-col items-center justify-center p-6 bg-beige-50 rounded-xl hover:bg-beige-100 hover:text-brown-800 transition-all border border-transparent hover:border-beige-200 group text-center">
              <ClipboardList className="w-8 h-8 mb-3 text-brown-400 group-hover:text-accent" />
              <span className="font-semibold text-xs sm:text-sm">Órdenes</span>
            </Link>
          </div>
        </div>

        <div className="bg-brown-800 p-8 rounded-2xl shadow-xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-4 font-serif">Estado de la Base de Datos</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-beige-200/60">Conexión Supabase</span>
                <span className="text-green-400 font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Activa
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-beige-200/60">Sincronización</span>
                <span className="text-accent font-medium italic">En tiempo real</span>
              </div>
              <p className="text-sm text-beige-200/40 mt-4 leading-relaxed">
                Todos los cambios realizados en este panel se reflejarán instantáneamente en la página principal y en tu base de datos en la nube.
              </p>
            </div>
          </div>
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-accent/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};
