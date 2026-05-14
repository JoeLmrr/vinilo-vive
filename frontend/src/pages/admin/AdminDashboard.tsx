import React, { useEffect } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Database, 
  LogOut, 
  Home as HomeIcon,
  ChevronRight,
  ClipboardList
} from 'lucide-react';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCheckFinished, setIsCheckFinished] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (!auth) {
      navigate('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
    setIsCheckFinished(true);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Resumen', path: '/admin/dashboard' },
    { icon: Package, label: 'Productos', path: '/admin/dashboard/productos' },
    { icon: Database, label: 'Inventario', path: '/admin/dashboard/inventario' },
    { icon: ClipboardList, label: 'Órdenes', path: '/admin/dashboard/ordenes' },
  ];

  if (!isCheckFinished) {
    return (
      <div className="min-h-screen bg-beige-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-beige-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-brown-800 text-white flex flex-col shadow-2xl">
        <div className="p-6 border-b border-brown-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-brown-800" />
            </div>
            <span className="font-bold text-xl tracking-tight font-serif">Vinilo Vive</span>
          </div>
          <p className="text-beige-200/60 text-xs mt-1 font-medium uppercase tracking-widest">Admin Panel</p>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-accent text-brown-800 font-semibold' 
                    : 'text-beige-100/70 hover:bg-brown-700 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-brown-800' : 'text-beige-100/70 group-hover:text-white'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-brown-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-beige-100/70 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-beige-100 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-brown-600">
            <Link to="/" className="hover:text-accent flex items-center gap-1 transition-colors">
              <HomeIcon className="w-4 h-4" />
              Ver Sitio Web
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-brown-800">Administrador</p>
              <p className="text-xs text-green-600 flex items-center justify-end gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                En línea
              </p>
            </div>
            <div className="w-10 h-10 bg-beige-100 rounded-full border-2 border-accent flex items-center justify-center font-bold text-brown-800">
              AD
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-grow overflow-auto p-8 bg-beige-50/50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
