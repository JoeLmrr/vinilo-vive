/**
 * @description Página "Nosotros" con la historia de la empresa y contacto.
 */
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Disc } from 'lucide-react';

export function AboutUs() {
  return (
    <div className="pb-20">
      {/* Hero History */}
      <section className="py-24 bg-beige-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl lg:text-7xl font-serif font-black text-brown-800 mb-8 leading-tight">
                Nuestra <span className="italic text-accent underline decoration-4">Historia</span>
              </h1>
              <p className="text-xl text-brown-600/80 mb-8 leading-relaxed">
                Vinilo Vive nace de una pasión compartida por el ritual de la música analógica. No solo vendemos discos: preservamos una forma auténtica de conectar con el arte, donde cada vinilo cuenta una historia y cada reproducción se convierte en una experiencia única.
              </p>
              <p className="text-lg text-brown-600/70 mb-10 leading-relaxed">

              </p>
              <div className="flex gap-12">
                <div>
                  <div className="text-4xl font-serif font-black text-accent mb-2">400+</div>
                  <div className="text-sm font-bold text-brown-800 uppercase tracking-widest">Discos en Stock</div>
                </div>
                <div>
                  <div className="text-4xl font-serif font-black text-accent mb-2">3+</div>
                  <div className="text-sm font-bold text-brown-800 uppercase tracking-widest">Años de Pasión</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl skew-x-1 group">
                <img 
                  src="https://i.ibb.co/QFZWWC2f/imagen-2026-05-14-183224734.png" 
                  alt="Nuestra tienda" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent rounded-full flex items-center justify-center p-4 shadow-xl rotate-12">
                <Disc className="w-full h-full text-brown-800 animate-spin-slow" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="col-span-1 lg:col-span-2 space-y-8">
              <h2 className="text-4xl font-serif font-bold text-brown-800 mb-8">Dónde Encontrarnos</h2>
              <div className="aspect-video bg-beige-200 rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                {/* Mock Map */}
                <iframe 
                  src="https://maps.google.com/maps?q=-8.136355558320641,-79.0357318&output=embed" 
                  className="w-full h-full border-0"
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            <div className="bg-brown-800 rounded-[3rem] p-10 text-beige-50 shadow-2xl">
              <h3 className="text-2xl font-serif font-bold text-accent mb-8">Contacto</h3>
              <ul className="space-y-8">
                <li className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <div className="font-bold text-lg mb-1">Ubicación</div>
                    <p className="text-beige-100/60"> Victos Larco Herrera 13009, Trujillo, Perú.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <div className="font-bold text-lg mb-1">Horarios</div>
                    <p className="text-beige-100/60">Lun - Sab: 11:00 - 22:00</p>
                    <p className="text-beige-100/60">Dom: 17:00 - 21:00 </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <div className="font-bold text-lg mb-1">Llámanos</div>
                    <p className="text-beige-100/60">+51 963 856 897</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <div className="font-bold text-lg mb-1">Email</div>
                    <p className="text-beige-100/60">vinilovive@contacto.com</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
