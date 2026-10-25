import { useState } from 'react'
import { FaAndroid, FaApple, FaGooglePlay, FaWhatsapp } from 'react-icons/fa'
import { SiAngular, SiIonic, SiCapacitor } from 'react-icons/si'

const wsp = '56954583715'
const mail = 'nexgentechnologies2024@gmail.com'
const playUrl = 'https://play.google.com/store/apps/details?id=com.nexgentech.petpaloozaa'
const screens = [
  '/apps/petpalooza/screen-1.png',
  '/apps/petpalooza/screen-2.png',
  '/apps/petpalooza/screen-3.png',
  '/apps/petpalooza/screen-4.png',
]

const Phone = ({ src, className = '' }) => (
  <div className={`relative mx-auto w-[230px] shrink-0 sm:w-[260px] ${className}`}>
    <div className="rounded-[2.4rem] border-[10px] border-slate-900 bg-slate-900 shadow-[0_30px_80px_-24px_rgba(18,53,91,0.55)]">
      <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
      <img src={src} alt="Pet Palooza en un teléfono" className="aspect-[9/19] w-full rounded-[1.7rem] object-cover object-top" />
    </div>
  </div>
)

const Logo = ({ className = 'h-9' }) => (
  <span className={`inline-flex items-baseline font-bold tracking-tight ${className}`}>
    <span className="text-navy">Why</span>
    <span className="text-sky">Not</span>
  </span>
)

export default function App() {
  const [shot, setShot] = useState(0)

  return (
    <div className="min-h-dvh bg-white">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#inicio" className="flex items-center gap-2">
            <Logo className="text-[28px] leading-none" />
            <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 sm:inline">Mobile</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <a href="#servicios">Servicios</a>
            <a href="#proceso">Cómo funciona</a>
            <a href="#app">Pet Palooza</a>
            <a href="#planes">Planes</a>
            <a href="#contacto" className="rounded-full bg-navy px-4 py-2 text-white">Cotizar app</a>
          </nav>
          <a href="#contacto" className="rounded-full bg-navy px-4 py-2 text-sm font-medium text-white md:hidden">Cotizar</a>
        </div>
      </header>

      <section id="inicio" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(47,111,237,0.12),transparent_42%),radial-gradient(circle_at_90%_10%,rgba(18,53,91,0.08),transparent_40%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">NexGen Technologies</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              Crea tu aplicación móvil con nosotros.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-7 text-slate-500">
              Atrévete y lanza tu app en Android e iOS con Ionic, Angular y Capacitor. Una sola base de código, dos tiendas.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#servicios" className="rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white">Ver servicios</a>
              <a href={playUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-navy">
                <FaGooglePlay /> Ver Pet Palooza
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-5 text-slate-400">
              <SiIonic className="text-3xl text-[#3880ff]" title="Ionic" />
              <SiAngular className="text-3xl text-[#dd0031]" title="Angular" />
              <SiCapacitor className="text-3xl text-[#119eff]" title="Capacitor" />
              <FaAndroid className="text-3xl text-[#3ddc84]" title="Android" />
              <FaApple className="text-3xl text-slate-800" title="iOS" />
            </div>
          </div>
          <div className="relative">
            <Phone src={screens[shot]} />
            <div className="mt-5 flex justify-center gap-2">
              {screens.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setShot(index)}
                  className={`h-2.5 w-2.5 rounded-full ${shot === index ? 'bg-sky' : 'bg-slate-300'}`}
                  aria-label={`Pantalla ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="bg-mist py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-extrabold text-ink">Servicios</h2>
          <p className="mt-2 max-w-2xl text-slate-500">Apps nativas de tienda, hechas con el stack que usamos en producción.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['Ionic', 'UI móvil lista para iOS y Android, con navegación, gestos y componentes nativos.'],
              ['Angular', 'Arquitectura sólida para apps con login, catálogos, pagos y paneles.'],
              ['Capacitor', 'Cámara, push, geolocalización y plugins nativos sin reescribir todo.'],
              ['Android', 'Publicación en Google Play, firma, AAB y fichas de tienda.'],
              ['iOS', 'Build para App Store, TestFlight y lineamientos de Apple.'],
              ['Mantención', 'Actualizaciones, tiendas, crash y nuevas versiones trimestre a trimestre.'],
            ].map(([title, copy]) => (
              <article key={title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                <h3 className="text-xl font-bold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proceso" className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-extrabold text-ink">¿Cómo funciona?</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['01', 'Contacta', 'Cuéntanos la app, el público y si va a Play, App Store o ambas.'],
              ['02', 'Prototipa', 'Definimos pantallas, stack Ionic/Angular y un MVP navegable.'],
              ['03', 'Prueba', 'TestFlight o APK interno. Ajustamos con tu visto bueno.'],
              ['04', 'Publica', 'Subimos a las tiendas y te dejamos el pipeline de nuevas versiones.'],
            ].map(([n, title, copy]) => (
              <article key={n} className="rounded-3xl border border-slate-100 p-6">
                <p className="text-sm font-bold text-sky">{n}</p>
                <h3 className="mt-2 text-xl font-bold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="app" className="bg-navy py-20 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">Caso real</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Pet Palooza, en el teléfono.</h2>
            <p className="mt-4 max-w-xl text-slate-300">
              App de NexGen para aprender sobre mascotas: razas, cuidado y fundaciones. Publicada en Google Play. Así se ve un producto WhyNot: Ionic + Angular + Capacitor, listo para la tienda.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-200">
              <li>Más de 50 descargas en Play Store</li>
              <li>Educación para dueños de perros, gatos y especies exóticas</li>
              <li>Desarrollada por Dev NexGen</li>
            </ul>
            <a href={playUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy">
              <FaGooglePlay /> Abrir en Google Play
            </a>
          </div>
          <div className="flex items-end justify-center gap-4 overflow-hidden pb-4">
            <Phone src={screens[1]} className="hidden translate-y-8 scale-90 opacity-80 lg:block" />
            <Phone src={screens[0]} />
          </div>
        </div>
      </section>

      <section id="planes" className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-extrabold text-ink">Planes</h2>
          <p className="mt-2 text-slate-500">Precios de partida. Cada app se cotiza según pantallas e integraciones.</p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              ['MVP', 'Desde $890.000', ['App Ionic + Angular', 'Android (Play interno)', 'Hasta 8 pantallas', '1 ronda de ajustes']],
              ['Tienda', 'Desde $1.490.000', ['Android + iOS', 'Publicación Play / App Store', 'Push o login', 'Capacitor nativo']],
              ['Producto', 'A medida', ['Catálogo, pagos o mapa', 'Panel web', 'Mantención trimestral', 'Nuevas versiones en tienda']],
            ].map(([name, price, items]) => (
              <article key={name} className="rounded-3xl border border-slate-100 p-7 shadow-sm">
                <h3 className="text-lg font-bold text-sky">{name}</h3>
                <p className="mt-2 text-2xl font-extrabold text-navy">{price}</p>
                <ul className="mt-5 space-y-2 text-sm text-slate-600">
                  {items.map((item) => (
                    <li key={item}>· {item}</li>
                  ))}
                </ul>
                <a href="#contacto" className="mt-6 inline-block rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white">Seleccionar</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="bg-mist py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Logo className="text-4xl" />
          <h2 className="mt-4 text-3xl font-extrabold text-ink">¿Why not tu app?</h2>
          <p className="mt-3 text-slate-500">Escríbenos y te devolvemos una propuesta con stack, plazos y tiendas.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={`https://wa.me/${wsp}`} className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-6 py-3 font-semibold text-white">
              <FaWhatsapp /> WhatsApp
            </a>
            <a href={`mailto:${mail}`} className="rounded-full border border-slate-200 bg-white px-6 py-3 font-semibold text-navy">{mail}</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-8 text-center text-sm text-slate-500">
        <p>
          WhyNot Mobile · un producto de{' '}
          <a href="https://becauseyes.cl/" className="font-semibold text-navy">NexGen Technologies</a>
        </p>
        <p className="mt-1">Ionic · Angular · Capacitor · Android · iOS</p>
      </footer>
    </div>
  )
}
