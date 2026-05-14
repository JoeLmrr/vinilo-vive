/* eslint-disable */

/**
 * @description Pie de página (Footer) de la aplicación.
 */
import { Disc, Instagram, Facebook } from 'lucide-react';

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-beige-100 border-t border-beige-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Disc className="w-8 h-8 text-brown-600" />
              <span className="text-xl font-serif font-bold text-brown-800">Vinilo Vive</span>
            </div>
            <p className="text-brown-600/80 max-w-sm">
              Tu refugio analógico. Discos seleccionados, accesorios de alta calidad y el mejor café para acompañar tus sesiones de escucha.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-brown-800 mb-4">Secciones</h4>
            <ul className="space-y-2 text-brown-600/80">
              <li><a href="/Catalogo" className="hover:text-accent transition-colors">Catálogo</a></li>
              <li><a href="/Accesorios" className="hover:text-accent transition-colors">Accesorios</a></li>
              <li><a href="/CartaCafe" className="hover:text-accent transition-colors">Carta Café</a></li>
              <li><a href="/Nosotros" className="hover:text-accent transition-colors">Nuestra Historia</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-brown-800 mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/vinilo.vive/" className="p-2 bg-beige-200 rounded-full text-brown-800 hover:bg-accent hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://l.instagram.com/?u=http%3A%2F%2Fwa.me%2F51963856897%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnsRkltAkfUytNYBgyPhLxq08-5dslScmCcdclcTFPMn4WqR_F6hxIoJTwnj0_aem_3y5rdIh6mM67fKnFeFIzAA&e=AUC_JNTcg3x0V9GiYvmWEolFGyYDe4rrEzF5LQVVWF_KEtoiLyIHE1uEAKeeKGEk7KLcRWBuHiRQdBQgstWPCimlPNBDXW9CCJGL7_FFgg" target="_blank" rel="noopener noreferrer" className="p-2 bg-beige-200 rounded-full text-brown-800 hover:bg-accent hover:text-white transition-all">
                <WhatsAppIcon />
              </a>
              <a href="https://www.facebook.com/people/Vinilo-Vive-Record-Café/61587742461812/?ref=PROFILE_EDIT_xav_ig_profile_page_web" className="p-2 bg-beige-200 rounded-full text-brown-800 hover:bg-accent hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-beige-200 text-center text-sm text-brown-600/60">
          <p>&copy; {new Date().getFullYear()} Vinilo Vive. Hecho con amor por lo analógico.</p>
        </div>
      </div>
    </footer>
  );
}