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
                  src="https://learn-us-east-1-prod-fleet02-xythos.content.blackboardcdn.com/5e545c6f58bc4/319108170?X-Blackboard-S3-Bucket=learn-us-east-1-prod-fleet01-xythos&X-Blackboard-Expiration=1778187600000&X-Blackboard-Signature=PHN3T6%2BOYE9I8ME0wmzJGGnp35s6a9qM0m%2FUPY6j%2FT4%3D&X-Blackboard-Client-Id=446172&X-Blackboard-S3-Region=us-east-1&response-cache-control=private%2C%20max-age%3D21600&response-content-disposition=inline%3B%20filename%2A%3DUTF-8%27%277536a2ea-c608-4b9a-be21-42b0cc319b45.png&response-content-type=image%2Fpng&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIHFR2kkp8t35gc1z95CJheuUvOY8WjzK11zvAXqRlu%2FPAiEA8Ut%2BU3fPqcGyR03WfUEEjXyCxZhEqcGj0EBDVki1aT4qvQUIuv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAEGgw2MzU1Njc5MjQxODMiDI7wMwKNys0DKt1xvyqRBan3Ymi1ZrtlyR6N4WKZ9%2BOrHUJD4aCmU%2Fnx10CEYjTRtFfQ0qFUwifumzkn1OjzNQ99AjPYdKvc4AyF9LftkJ8rGMX2Y8M2kW18GddNbGWmVR%2ByGzjU5Z3Kk44JUJVFK1B7LCPJa3k1Bt2itIBjAveLSZUSSr5DJqST74MUrJn15Uy4FLMRE8KLogKhLx6nub%2Fg5L65872LfI2xh3gYImVXIYKs3%2FqdkdeHtNfZ5mVYznjGmFrS3gn9vxXBQwOmMQMq8YuitnTadyPPfeZh%2FC2JWR57jbezLLu2fBEUpKOEdizPPHOD9VbabdvFK3pOHT%2BKcY%2FjJDz4BqVTwexfd68S9dEqdJHozm%2FZ8GYY92iQflGSkodo76gdnmf%2FWT08ibFteUsmFZEvHpDZqLeK3UTY8s6vPoyon8S76fKZowFHtE52zjZejuT9WLxRN5OYKiaTHuoMKT428B8nU4e3LAoBB%2FTWnF%2FuEHyD%2F0AjGgpygGqJC%2BJ%2FMP4SCCWrfJxWTmr2GGL18zjJ%2FPdN0oJtWgLQiKKIMtyeBT7VvEG%2BM8ERQ9Te4WFaJSltxLTrY0ACSu6U%2B0aCmplNkzg0eIWnvu%2BtjxWz8nI7mEzcSUt6%2FpRT%2FldENQSGwuNQU6p0RRN%2Fx%2Fq9omI39C14nbwniYCbZdFEwQWm4Q6189OxTwrN6YMHSf1rx8nCi5sU4Lmc50AG4RLyDHlYEgV8jaf%2FOjcIbGiJYxXDHfI04BAENpb2h8iQ6cjx4QILiXFhhvC%2BaR5FYLCWtG3XVkoSkU%2B%2BYYaaTyINMFjvTRVzRz09CexY8HM14b52l7yIdRmBKyJEZlKeT35WWhOxi6dNy7jk6aQIhhDDZza4BArmoc00JWwjagptTzCB%2FvLPBjqxAXgOEkhLKzg6oCbBzR%2F4nn%2BCeeXks%2F1wSAqKQ7761KUUI98ufGdWHugohYiOghcAqmTdJDjNJhohuY7jjkUYuqf%2FpC8EiR2YqumnnuoicNccWfKzeosviEX%2FzBHQfZC862GaK5IaK%2FQ7kAaRy%2Bw1XLLo4uJE4pPiu7UXH%2Fzx2QtzuQ9EmAzl3I%2F%2F%2Fvzi14pwuU3V7BC3y9u42IDSU4CXNyT1tEDhxd2nVqtZSNRZid2BeQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260507T150000Z&X-Amz-SignedHeaders=host&X-Amz-Expires=21600&X-Amz-Credential=ASIAZH6WM4PL4LUOY7LL%2F20260507%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=ddf67fe31d4183c02ef5c6c45d0e4bfe8a85552048860a824b12085117c7f2c3" 
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373531531615!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db5!2sMelbourne%20Central!5e0!3m2!1sen!2sau!4v1567150963539!5m2!1sen!2sau" 
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
                    <p className="text-beige-100/60">hola@vinilovive.com</p>
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
