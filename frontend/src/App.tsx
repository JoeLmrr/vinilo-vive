/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * @owner Vinilo Vive
 * @description Componente principal de enrutamiento de la aplicación.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Accessories } from './pages/Accessories';
import { CafeMenu } from './pages/CafeMenu';
import { AboutUs } from './pages/AboutUs';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminHome } from './pages/admin/AdminHome';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminInventory } from './pages/admin/AdminInventory';
import { AdminOrders } from './pages/admin/AdminOrders';

export default function App() {
  return (
    <BrowserRouter>
      <div id="app-root" className="min-h-screen flex flex-col bg-beige-50">
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={
            <>
              <Navbar />
              <main className="flex-grow"><Home /></main>
              <Footer />
            </>
          } />
          <Route path="/Casa" element={
            <>
              <Navbar />
              <main className="flex-grow"><Home /></main>
              <Footer />
            </>
          } />
          <Route path="/Catalogo" element={
            <>
              <Navbar />
              <main className="flex-grow"><Catalog /></main>
              <Footer />
            </>
          } />
          <Route path="/Accesorios" element={
            <>
              <Navbar />
              <main className="flex-grow"><Accessories /></main>
              <Footer />
            </>
          } />
          <Route path="/CartaCafe" element={
            <>
              <Navbar />
              <main className="flex-grow"><CafeMenu /></main>
              <Footer />
            </>
          } />
          <Route path="/Nosotros" element={
            <>
              <Navbar />
              <main className="flex-grow"><AboutUs /></main>
              <Footer />
            </>
          } />
          <Route path="/Producto/:id" element={
            <>
              <Navbar />
              <main className="flex-grow"><ProductDetail /></main>
              <Footer />
            </>
          } />
          <Route path="/Checkout" element={
            <>
              <Navbar />
              <main className="flex-grow"><Checkout /></main>
              <Footer />
            </>
          } />

          {/* Rutas Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />}>
             <Route index element={<AdminHome />} />
             <Route path="productos" element={<AdminProducts />} />
             <Route path="inventario" element={<AdminInventory />} />
             <Route path="ordenes" element={<AdminOrders />} />
           </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
