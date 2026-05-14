import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { 
  ClipboardList, 
  Search, 
  Eye, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle,
  X,
  User,
  Mail,
  Calendar,
  DollarSign,
  Package
} from 'lucide-react';

interface Orden {
  id: number;
  usuario_id: string;
  total: number;
  estado: 'pendiente' | 'enviado' | 'entregado' | 'cancelado';
  fecha: string;
  usuarios: {
    nombre: string;
    email: string;
  };
}

export const AdminOrders = () => {
  const [orders, setOrders] = useState<Orden[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await api.getOrdenes();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (id: number) => {
    try {
      const details = await api.getOrdenById(id);
      setSelectedOrder(details);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    setIsUpdating(true);
    try {
      await api.updateOrdenEstado(id, newStatus);
      // Update local state
      setOrders(orders.map(o => o.id === id ? { ...o, estado: newStatus as any } : o));
      if (selectedOrder && selectedOrder.id === id) {
        setSelectedOrder({ ...selectedOrder, estado: newStatus });
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendiente': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'enviado': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'entregado': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelado': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pendiente': return <Clock className="w-4 h-4" />;
      case 'enviado': return <Truck className="w-4 h-4" />;
      case 'entregado': return <CheckCircle className="w-4 h-4" />;
      case 'cancelado': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredOrders = orders.filter(o => 
    o.id.toString().includes(searchTerm) ||
    o.usuarios?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.usuarios?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brown-800 font-serif">Gestión de Órdenes</h1>
          <p className="text-brown-600">Supervisa pedidos, estados y envíos de tus clientes.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-beige-100 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-300 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por ID de orden, cliente o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-beige-50/50 border border-beige-100 rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-beige-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-beige-50 border-b border-beige-100 text-brown-500 text-sm uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">ID Orden</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-brown-400">
                    No se encontraron órdenes.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-beige-50/30 transition-colors group">
                    <td className="px-6 py-4 font-bold text-brown-800">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-brown-800">{order.usuarios?.nombre}</p>
                        <p className="text-xs text-brown-400">{order.usuarios?.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-brown-600 text-sm">
                      {new Date(order.fecha).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-bold text-brown-800">
                      ${Number(order.total).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.estado)}`}>
                        {getStatusIcon(order.estado)}
                        {order.estado.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleViewDetails(order.id)}
                        className="p-2 hover:bg-beige-100 text-brown-400 hover:text-accent rounded-lg transition-colors"
                        title="Ver detalles"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brown-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-white px-8 py-6 border-b border-beige-100 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold text-brown-800 font-serif">Detalle de Orden #{selectedOrder.id}</h2>
                <p className="text-brown-400 text-sm uppercase tracking-widest font-semibold">Vinilo Vive Store</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-beige-50 rounded-full transition-colors">
                <X className="w-6 h-6 text-brown-300" />
              </button>
            </div>

            <div className="p-8 space-y-8">
              {/* Order Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-beige-50/50 p-6 rounded-2xl border border-beige-100 space-y-4">
                  <h3 className="flex items-center gap-2 font-bold text-brown-800">
                    <User className="w-4 h-4 text-accent" />
                    Información del Cliente
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center justify-between">
                      <span className="text-brown-400">Nombre:</span>
                      <span className="font-semibold text-brown-800">{selectedOrder.usuarios?.nombre}</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-brown-400 text-xs flex items-center gap-1">
                        <Mail className="w-3 h-3" /> Email:
                      </span>
                      <span className="text-brown-600">{selectedOrder.usuarios?.email}</span>
                    </p>
                  </div>
                </div>

                <div className="bg-beige-50/50 p-6 rounded-2xl border border-beige-100 space-y-4">
                  <h3 className="flex items-center gap-2 font-bold text-brown-800">
                    <ClipboardList className="w-4 h-4 text-accent" />
                    Resumen del Pedido
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center justify-between">
                      <span className="text-brown-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Fecha:
                      </span>
                      <span className="text-brown-800 font-semibold">{new Date(selectedOrder.fecha).toLocaleString()}</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-brown-400 flex items-center gap-1">
                        <DollarSign className="w-3 h-3" /> Total Pagado:
                      </span>
                      <span className="text-xl font-bold text-brown-800">${Number(selectedOrder.total).toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Update Section */}
              <div className="bg-brown-800 p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 space-y-4">
                  <h3 className="font-bold flex items-center gap-2 font-serif text-lg">
                    <Truck className="w-5 h-5 text-accent" />
                    Gestionar Estado del Envío
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {['pendiente', 'enviado', 'entregado', 'cancelado'].map((status) => (
                      <button
                        key={status}
                        disabled={isUpdating}
                        onClick={() => handleUpdateStatus(selectedOrder.id, status)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                          selectedOrder.estado === status 
                            ? 'bg-accent text-brown-800 border-accent shadow-lg shadow-accent/20' 
                            : 'bg-white/10 text-white/60 border-white/10 hover:bg-white/20'
                        }`}
                      >
                        {status.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
              </div>

              {/* Items Table */}
              <div className="space-y-4">
                <h3 className="font-bold text-brown-800 flex items-center gap-2">
                  <Package className="w-4 h-4 text-accent" />
                  Productos en la Orden
                </h3>
                <div className="border border-beige-100 rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-beige-50 text-brown-500 text-xs uppercase font-bold">
                      <tr>
                        <th className="px-4 py-3">Producto</th>
                        <th className="px-4 py-3 text-center">Cant.</th>
                        <th className="px-4 py-3 text-right">Precio Unit.</th>
                        <th className="px-4 py-3 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-beige-50">
                      {selectedOrder.detalle_orden?.map((item: any) => (
                        <tr key={item.id} className="text-sm">
                          <td className="px-4 py-3 flex items-center gap-3">
                            <img src={item.productos?.imagen_url} className="w-10 h-10 rounded-lg object-cover border border-beige-100" alt="" />
                            <span className="font-semibold text-brown-800">{item.productos?.nombre}</span>
                          </td>
                          <td className="px-4 py-3 text-center text-brown-600 font-bold">{item.cantidad}</td>
                          <td className="px-4 py-3 text-right text-brown-400">${Number(item.precio_unitario).toLocaleString()}</td>
                          <td className="px-4 py-3 text-right font-bold text-brown-800">${(item.cantidad * item.precio_unitario).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-6 border-t border-beige-100 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-3 bg-brown-700 hover:bg-brown-800 text-white rounded-xl font-bold transition-all shadow-lg shadow-brown-900/10"
                >
                  Cerrar Detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
