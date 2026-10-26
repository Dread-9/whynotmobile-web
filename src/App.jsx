import { useEffect, useState } from 'react'
import { FaAndroid, FaApple, FaWhatsapp, FaInstagram } from 'react-icons/fa'
import {
  HiOutlineChat,
  HiOutlineLightBulb,
  HiOutlineDeviceMobile,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineCheck,
  HiOutlineMoon,
  HiOutlineSun,
} from 'react-icons/hi'
import { SiAngular, SiIonic, SiCapacitor } from 'react-icons/si'
import { sendContactEmail } from './utils/sendContact'
import { copy } from './i18n'
import PetPalooza from './PetPalooza'
import SeasonDecor from './SeasonDecor'
import SeasonBanner from './SeasonBanner'
import { getSeason } from './season'

const wsp = '56954583715'
const playUrl = 'https://play.google.com/store/apps/details?id=com.nexgentech.petpaloozaa'
const serviceMeta = [
  [SiIonic, '#3880ff'],
  [SiAngular, '#dd0031'],
  [SiCapacitor, '#119eff'],
  [FaAndroid, '#3ddc84'],
  [FaApple, '#1c1917'],
  [HiOutlineDeviceMobile, '#7c3aed'],
]

const Phone = ({ children }) => (
  <div className="relative mx-auto w-[240px] sm:w-[270px]">
    <div className="overflow-hidden rounded-[2.6rem] border-[11px] border-[#1c1917] bg-white shadow-[0_40px_80px_-28px_rgba(76,29,149,0.35)] dark:border-violet-950">
      <div className="absolute left-1/2 top-2 z-10 h-[18px] w-[92px] -translate-x-1/2 rounded-full bg-[#1c1917]" />
      <div className="aspect-[9/19.2] overflow-hidden bg-white">{children}</div>
    </div>
  </div>
)

const festiveLogo = {
  christmas: '/logo/wnm-christmas.png',
  newyear: '/logo/wnm-newyear.png',
  valentine: '/logo/wnm-valentine.png',
  halloween: '/logo/wnm-halloween.png',
}

const Logo = ({ className = 'h-12', season }) => {
  const festive = season?.id && festiveLogo[season.id]
  const img = (
    <img
      src={festive || '/logo/wnm-badge.png'}
      alt="WhyNot Mobile"
      className={`${festive ? 'h-full w-full' : className} object-contain ${festive ? '' : 'w-auto rounded-full'} ${season?.id === 'dieciocho' ? 'logo-18' : ''}`}
    />
  )
  if (!festive) return img
  return <span className={`logo-plate logo-plate-${season.id}`}>{img}</span>
}

const CheckRow = ({ checked, onChange, label, children, locked = false }) => (
  <li className="text-sm text-neutral-600 dark:text-violet-200/80">
    <label className={`flex items-start gap-2 ${locked ? 'cursor-default' : 'cursor-pointer'}`}>
      <input type="checkbox" checked={checked} disabled={locked} onChange={onChange} className="mt-1 accent-[#7c3aed]" />
      <span>
        <span className="font-medium">{label}</span>
        {children}
      </span>
    </label>
  </li>
)

const HeroUi = ({ t }) => (
  <div className="flex h-full flex-col bg-gradient-to-b from-[#f6f4ff] to-white px-4 pb-6 pt-10">
    <p className="whitespace-nowrap text-center text-[11px] font-medium text-mark">{t.brand}</p>
    <h3 className="mt-3 text-lg font-semibold text-ink">{t.heroAppTitle}</h3>
    <p className="mt-1 text-[11px] leading-4 text-neutral-500">Ionic · Angular · Capacitor</p>
    <div className="mt-5 grid grid-cols-2 gap-2">
      {t.tiles.map((item) => (
        <div key={item} className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-violet-100">
          <div className="h-8 rounded-xl bg-violet-100" />
          <p className="mt-2 text-[10px] font-medium text-ink">{item}</p>
        </div>
      ))}
    </div>
    <div className="mt-auto rounded-2xl bg-mark px-3 py-2.5 text-center text-[11px] font-medium text-white">{t.heroCta}</div>
  </div>
)

const IconBtn = ({ label, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="grid h-10 w-10 place-items-center rounded-full text-ink ring-1 ring-violet-200 hover:bg-mist dark:text-violet-100 dark:ring-violet-800 dark:hover:bg-violet-950"
  >
    {children}
  </button>
)

export default function App() {
  const [open, setOpen] = useState(null)
  const [menu, setMenu] = useState(false)
  const [lang, setLang] = useState('es')
  const [dark, setDark] = useState(false)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [terms, setTerms] = useState(false)
  const [custom, setCustom] = useState({
    mvp: false,
    pantallas: false,
    extras: false,
    conjunto: true,
    aso: false,
    push: false,
  })
  const [form, setForm] = useState({ name: '', email: '', phone: '', plan: 'Custom', message: '' })
  const [modal, setModal] = useState(false)
  const [hash, setHash] = useState(() => (typeof window === 'undefined' ? '' : window.location.hash))
  const t = copy[lang]
  const isPet = hash.replace('#/', '#').startsWith('#petpalooza')
  const season = getSeason()

  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (isPet) {
      document.title = 'PetPalooza | WhyNot Mobile'
      window.scrollTo(0, 0)
      return
    }
    document.title = 'WhyNot Mobile | Apps Ionic, Angular y Capacitor'
    const id = hash.replace('#', '').replace('/', '')
    if (!id || id === 'inicio') {
      window.scrollTo(0, 0)
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [hash, isPet])

  useEffect(() => {
    const savedLang = localStorage.getItem('wn-lang')
    const savedDark = localStorage.getItem('wn-dark') === '1'
    if (savedLang === 'en' || savedLang === 'es') setLang(savedLang)
    setDark(savedDark)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.lang = lang
    if (season?.id) document.documentElement.dataset.season = season.id
    else delete document.documentElement.dataset.season
    localStorage.setItem('wn-dark', dark ? '1' : '0')
    localStorage.setItem('wn-lang', lang)
  }, [dark, lang, season])

  const customReady = custom.mvp || custom.pantallas
  const monthly = 49990 + (custom.extras ? 89990 : 0) + (custom.aso ? 19990 : 0) + (custom.push ? 14990 : 0)

  const planLines = () => {
    if (form.plan === 'Standard') {
      return ['MVP · 8 pantallas', 'Ionic + Angular + Capacitor', 'Android / Play Store', 'Push']
    }
    if (form.plan === 'Premium') {
      return ['Pantallas a medida', 'Android + iOS', 'Play y App Store', 'ASO', 'Push, cámara o GPS']
    }
    const lines = []
    if (custom.mvp) lines.push(t.mvp)
    if (custom.pantallas) lines.push(`${t.screens}: login, perfil, feed, ajustes`)
    if (custom.extras) lines.push(t.extraScreens)
    lines.push('Ionic + Angular + Capacitor, Android / Play Store, diseño móvil')
    if (custom.aso) lines.push('ASO')
    if (custom.push) lines.push('Push')
    return lines
  }

  const pickPlan = (name) => {
    setForm((prev) => ({ ...prev, plan: name }))
    setStatus('idle')
    setError('')
    setModal(true)
  }

  useEffect(() => {
    if (!modal) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setModal(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [modal])

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setStatus('sending')
    const extras = form.plan === 'Custom'
      ? Object.entries(custom)
          .filter(([, on]) => on)
          .map(([key]) => key)
          .join(', ')
      : ''
    try {
      const lines = planLines()
      await sendContactEmail({
        ...form,
        plan: form.plan,
        detail_custom: lines.join(', '),
        message: [
          extras && `Custom: ${extras}`,
          form.message,
        ]
          .filter(Boolean)
          .join('\n'),
      })
      setStatus('ok')
      setForm({ name: '', email: '', phone: '', plan: form.plan, message: '' })
      if (modal) {
        window.setTimeout(() => setModal(false), 1800)
      }
    } catch (err) {
      setStatus('error')
      setError(err?.text || err?.message || 'No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp.')
    }
  }

  return (
    <div className="site-shell min-h-dvh bg-white">
      <SeasonDecor season={season} copy={t.season} />
      <header className="site-header sticky top-0 z-40 border-b border-violet-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
          <a href="#inicio" className="shrink-0 whitespace-nowrap duration-300 hover:scale-105" aria-label={t.brand}>
            <Logo className="h-12 sm:h-14" season={season} />
          </a>
          <nav className="hidden flex-1 items-center justify-center gap-1 text-sm text-neutral-600 dark:text-violet-200 lg:flex">
            {t.nav.map(([href, label]) => (
              <a key={href} href={href} className="rounded-full px-3 py-2 hover:bg-mist hover:text-ink dark:hover:bg-violet-950 dark:hover:text-white">
                {label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <IconBtn label={t.theme} onClick={() => setDark((v) => !v)}>
              {dark ? <HiOutlineSun className="text-xl" /> : <HiOutlineMoon className="text-xl" />}
            </IconBtn>
            <IconBtn label={t.lang} onClick={() => setLang((v) => (v === 'es' ? 'en' : 'es'))}>
              <span className="flex items-end gap-0.5 text-[11px] font-semibold leading-none">
                <span>文</span>
                <span>A</span>
              </span>
            </IconBtn>
            <button type="button" onClick={() => setMenu((v) => !v)} className="grid h-10 w-10 place-items-center rounded-xl text-ink dark:text-violet-100 lg:hidden" aria-label="Menú">
              {menu ? <HiOutlineX className="text-3xl" /> : <HiOutlineMenu className="text-3xl" />}
            </button>
          </div>
        </div>
        {menu && (
          <nav className="border-t border-violet-100 bg-white px-6 py-4 dark:border-violet-900 dark:bg-[#120c1c] lg:hidden">
            <div className="flex flex-col gap-1 text-neutral-700 dark:text-violet-100">
              {t.nav.map(([href, label]) => (
                <a key={href} href={href} onClick={() => setMenu(false)} className="rounded-full px-3 py-2 hover:bg-mist dark:hover:bg-violet-950">
                  {label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>
      {season && <SeasonBanner season={season} copy={t.season[season.id]} />}

      {isPet ? (
        <PetPalooza t={t} />
      ) : (
      <>
      <section id="inicio" className="hero-wash relative pt-10">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="text-[2.4rem] font-semibold leading-[1.12] text-ink dark:text-white sm:text-5xl lg:text-[48px]">
              {t.heroTitle}
            </h1>
            <p className="mt-6 max-w-md text-lg leading-8 text-neutral-500 dark:text-violet-200/80">{t.heroLead}</p>
            <a href="#servicios" className="mt-8 inline-flex rounded-full bg-mark px-7 py-3.5 text-sm font-semibold text-white">
              {t.seeServices}
            </a>
          </div>
          <div className="relative mx-auto w-full max-w-[320px] py-4">
            <div className="float-phone">
              <Phone>
                <HeroUi t={t} />
              </Phone>
            </div>
          </div>
        </div>

        <div className="relative z-20 mx-auto mt-10 max-w-5xl px-6 pb-8">
          <div className="flex flex-col rounded-[2rem] bg-white shadow-[0_20px_50px_-24px_rgba(76,29,149,0.28)] dark:bg-[#1a1028] sm:flex-row">
            <button type="button" onClick={() => setOpen(open === 'ventajas' ? null : 'ventajas')} className="flex flex-1 items-center gap-4 px-6 py-5 text-left">
              <HiOutlineDeviceMobile className="shrink-0 text-3xl text-mark" />
              <span>
                <span className="block font-semibold text-navy dark:text-violet-100">{t.pillA}</span>
                <span className="mt-0.5 block text-sm text-neutral-500 dark:text-violet-300">{t.pillASub}</span>
              </span>
            </button>
            <button type="button" onClick={() => setOpen(open === 'planes' ? null : 'planes')} className="flex flex-1 items-center gap-4 border-t border-violet-100 px-6 py-5 text-left dark:border-violet-900 sm:border-l sm:border-t-0">
              <HiOutlineLightBulb className="shrink-0 text-3xl text-mark" />
              <span>
                <span className="block font-semibold text-navy dark:text-violet-100">{t.pillB}</span>
                <span className="mt-0.5 block text-sm text-neutral-500 dark:text-violet-300">{t.pillBSub}</span>
              </span>
            </button>
          </div>
          {open === 'ventajas' && (
            <div className="mt-3 rounded-3xl bg-white p-6 text-sm text-neutral-600 shadow-md dark:bg-[#1a1028] dark:text-violet-200">{t.pillABody}</div>
          )}
          {open === 'planes' && (
            <div className="mt-3 rounded-3xl bg-white p-6 text-sm text-neutral-600 shadow-md dark:bg-[#1a1028] dark:text-violet-200">{t.pillBBody}</div>
          )}
        </div>
      </section>

      <section id="servicios" className="bg-mist px-6 py-20 dark:bg-[#1a1028]">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-semibold text-ink dark:text-white">{t.servicesTitle}</h2>
          <p className="mt-2 text-lg text-neutral-500 dark:text-violet-200/80">{t.servicesLead}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.map(([title, text], index) => {
              const [Icon, color] = serviceMeta[index]
              return (
                <article key={title} className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-violet-100 dark:bg-[#120c1c] dark:ring-violet-900">
                  <Icon className="text-3xl" style={{ color: dark && title === 'iOS' ? '#f5f3ff' : color }} />
                  <h3 className="mt-4 text-xl font-semibold text-ink dark:text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-500 dark:text-violet-200/80">{text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="proceso" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-semibold text-ink dark:text-white">{t.howTitle}</h2>
          <p className="mt-2 text-lg text-neutral-500 dark:text-violet-200/80">{t.howLead}</p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {t.steps.map(([n, title, text]) => (
              <article key={n} className="text-center">
                <div className="mx-auto mb-5 grid h-24 w-24 place-items-center rounded-full bg-mist text-3xl font-semibold text-mark dark:bg-violet-950">{n}</div>
                <h3 className="text-xl font-semibold text-ink dark:text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-500 dark:text-violet-200/80">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <a href="#planes" className="rounded-full bg-mark px-7 py-3 text-sm font-medium text-white">{t.seePlans}</a>
          </div>
        </div>
      </section>

      <section id="trabajos" className="bg-mist px-6 py-20 dark:bg-[#1a1028]">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-semibold text-ink dark:text-white">{t.worksTitle}</h2>
          <p className="mt-2 text-lg text-neutral-500 dark:text-violet-200/80">{t.worksLead}</p>
          <article className="mt-10 grid items-center gap-10 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-violet-100 dark:bg-[#120c1c] dark:ring-violet-900 lg:grid-cols-2 lg:p-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mark">{t.sample}</p>
              <h3 className="mt-2 text-3xl font-semibold text-ink dark:text-white">PetPalooza</h3>
              <p className="mt-3 text-neutral-500 dark:text-violet-200/80">{t.petCopy}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#petpalooza" className="inline-flex rounded-full bg-mark px-6 py-3 text-sm font-semibold text-white">
                  {t.seeSheet}
                </a>
                <a href={playUrl} target="_blank" rel="noreferrer" className="inline-flex rounded-full px-6 py-3 text-sm font-semibold text-mark ring-1 ring-violet-200">
                  {t.seePlay}
                </a>
              </div>
            </div>
            <Phone>
              <img src="/apps/petpalooza/screen-1.png" alt="PetPalooza" className="h-full w-full object-cover object-top" />
            </Phone>
          </article>
        </div>
      </section>

      <section id="planes" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-semibold text-ink dark:text-white">{t.plansTitle}</h2>
          <p className="mt-2 text-lg text-neutral-500 dark:text-violet-200/80">{t.plansLead}</p>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <article className="flex flex-col rounded-[2rem] border border-violet-100 p-8 shadow-sm dark:border-violet-900 dark:bg-[#1a1028]">
              <h3 className="text-lg font-semibold text-mark">Custom</h3>
              <p className="mt-3 text-3xl font-semibold text-ink dark:text-white">
                $0 <span className="text-base font-normal text-neutral-400">{t.firstPay}</span>
              </p>
              <p className="mt-1 text-sm text-neutral-400">
                {t.then} ${monthly.toLocaleString('es-CL')} {t.month}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                <CheckRow checked={custom.mvp} label={t.mvp} onChange={() => setCustom((c) => ({ ...c, mvp: !c.mvp, pantallas: false }))} />
                <CheckRow checked={custom.pantallas} label={t.screens} onChange={() => setCustom((c) => ({ ...c, pantallas: !c.pantallas, mvp: false }))}>
                  <ul className="mt-1 list-disc pl-4 text-neutral-500 dark:text-violet-300">
                    <li>Login.</li>
                    <li>Perfil.</li>
                    <li>Feed.</li>
                    <li>Ajustes.</li>
                    <li>$89.990</li>
                  </ul>
                </CheckRow>
                <CheckRow checked={custom.extras} label={t.extraScreens} onChange={() => setCustom((c) => ({ ...c, extras: !c.extras }))} />
                <CheckRow checked={custom.conjunto} locked label={t.always}>
                  <ul className="mt-1 list-disc pl-4 text-neutral-500 dark:text-violet-300">
                    <li>Ionic + Angular + Capacitor</li>
                    <li>Android / Play Store</li>
                    <li>Diseño móvil</li>
                  </ul>
                </CheckRow>
                <CheckRow checked={custom.aso} label="ASO" onChange={() => setCustom((c) => ({ ...c, aso: !c.aso }))} />
                <CheckRow checked={custom.push} label="Push" onChange={() => setCustom((c) => ({ ...c, push: !c.push }))} />
              </ul>
              <label className="mt-4 flex items-start gap-2 text-xs text-neutral-400">
                <input type="checkbox" checked={terms} onChange={() => setTerms((v) => !v)} className="mt-0.5 accent-[#7c3aed]" />
                {t.terms}
              </label>
              <button type="button" disabled={!customReady || !terms} onClick={() => pickPlan('Custom')} className="mt-4 rounded-full bg-mark px-5 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-neutral-300">
                {t.select}
              </button>
            </article>

            <article className="flex flex-col rounded-[2rem] border border-violet-100 p-8 shadow-sm dark:border-violet-900 dark:bg-[#1a1028]">
              <h3 className="text-lg font-semibold text-mark">Standard</h3>
              <p className="mt-3 text-3xl font-semibold text-ink dark:text-white">
                $890.000 <span className="text-base font-normal text-neutral-400">{t.firstPay}</span>
              </p>
              <p className="mt-1 text-sm text-neutral-400">{t.then} $39.990 {t.month}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-neutral-600 dark:text-violet-200/80">
                {['MVP · 8 pantallas', 'Ionic + Angular + Capacitor', 'Android / Play Store', 'Push'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <HiOutlineCheck className="shrink-0 text-mark" /> {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-neutral-400">{t.terms}</p>
              <button type="button" onClick={() => pickPlan('Standard')} className="mt-4 rounded-full bg-mark px-5 py-2.5 text-sm font-medium text-white">
                {t.select}
              </button>
            </article>

            <article className="flex flex-col rounded-[2rem] border border-violet-200 bg-mist p-8 shadow-sm dark:border-violet-800 dark:bg-violet-950/40">
              <h3 className="text-lg font-semibold text-mark">Premium</h3>
              <p className="text-sm font-semibold text-orange-500">$2.060.000 · 18% OFF</p>
              <p className="mt-1 text-3xl font-semibold text-ink dark:text-white">
                $1.690.000 <span className="text-base font-normal text-neutral-400">{t.firstPay}</span>
              </p>
              <p className="mt-1 text-sm text-neutral-400">{t.then} $59.990 {t.month}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-neutral-600 dark:text-violet-200/80">
                {['Pantallas a medida', 'Android + iOS', 'Play y App Store', 'ASO', 'Push, cámara o GPS'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <HiOutlineCheck className="shrink-0 text-mark" /> {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-neutral-400">{t.terms}</p>
              <button type="button" onClick={() => pickPlan('Premium')} className="mt-4 rounded-full bg-mark px-5 py-2.5 text-sm font-medium text-white">
                {t.select}
              </button>
            </article>
          </div>
        </div>
      </section>

      <section id="contacto" className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <Logo className="h-16" season={season} />
            <h2 className="mt-4 text-4xl font-semibold text-ink dark:text-white">{t.contactTitle}</h2>
            <p className="mt-3 max-w-md text-neutral-500 dark:text-violet-200/80">{t.contactLead}</p>
            <p className="mt-8 max-w-sm text-sm leading-6 text-neutral-500 dark:text-violet-200/80">
              Antonio Bellet 193, 1210
              <br />
              7500000 Providencia, Región Metropolitana
            </p>
            <a href="tel:+56954583715" className="mt-3 block text-sm font-medium text-ink dark:text-white">
              +56 9 5458 3715
            </a>
            <a href={`https://wa.me/${wsp}`} className="mt-5 inline-flex items-center gap-2 text-lg font-medium text-mark">
              <FaWhatsapp className="text-2xl" /> WhatsApp
            </a>
          </div>
          <form onSubmit={onSubmit} className="rounded-[2rem] bg-mist p-7 dark:bg-[#1a1028]">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-neutral-700 dark:text-violet-100">
                {t.name}
                <input required name="name" placeholder={t.namePh} value={form.name} onChange={onChange} className="field" />
              </label>
              <label className="text-sm font-medium text-neutral-700 dark:text-violet-100">
                {t.email}
                <input required type="email" name="email" placeholder={t.emailPh} value={form.email} onChange={onChange} className="field" />
              </label>
              <label className="text-sm font-medium text-neutral-700 dark:text-violet-100">
                {t.phone}
                <input name="phone" placeholder="+56 9 1234 5678" value={form.phone} onChange={onChange} className="field" />
              </label>
              <label className="text-sm font-medium text-neutral-700 dark:text-violet-100">
                {t.plan}
                <select name="plan" value={form.plan} onChange={onChange} className="field">
                  <option>Custom</option>
                  <option>Standard</option>
                  <option>Premium</option>
                </select>
              </label>
            </div>
            <label className="mt-4 block text-sm font-medium text-neutral-700 dark:text-violet-100">
              {t.message}
              <textarea required name="message" rows={4} placeholder={t.msgPh} value={form.message} onChange={onChange} className="field" />
            </label>
            <button disabled={status === 'sending'} type="submit" className="mt-5 rounded-full bg-mark px-7 py-3 text-sm font-semibold text-white disabled:opacity-60">
              {status === 'sending' ? t.sending : t.send}
            </button>
            {status === 'ok' && <p className="mt-3 text-sm text-green-600">{t.ok}</p>}
            {status === 'error' && <p className="mt-3 text-sm text-red-500">{error}</p>}
          </form>
        </div>
      </section>
      </>
      )}

      <footer className="site-footer border-t border-violet-100 px-6 py-14 text-sm text-neutral-500 dark:border-violet-900 dark:text-violet-300">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo className="h-16" season={season} />
            <p className="mt-2 whitespace-nowrap font-semibold text-ink dark:text-white">{t.brand}</p>
            <p className="mt-1 text-mark">{t.dare}</p>
            <div className="mt-5 flex gap-4 text-xl text-ink dark:text-violet-100">
              <a href="https://www.instagram.com/_nexgentech/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href={`https://wa.me/${wsp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
            </div>
          </div>
          <div>
            <p className="font-semibold text-ink dark:text-white">{t.menu}</p>
            <a href="#inicio" className="mt-3 block hover:text-mark">{t.nav[0][1]}</a>
            <a href="#proceso" className="mt-2 block hover:text-mark">{t.nav[2][1]}</a>
            <a href="#contacto" className="mt-2 block hover:text-mark">{t.nav[5][1]}</a>
          </div>
          <div>
            <p className="font-semibold text-ink dark:text-white">{t.sections}</p>
            <a href="#inicio" className="mt-3 block hover:text-mark">{t.nav[0][1]}</a>
            <a href="#servicios" className="mt-2 block hover:text-mark">{t.nav[1][1]}</a>
            <a href="#proceso" className="mt-2 block hover:text-mark">{t.nav[2][1]}</a>
            <a href="#planes" className="mt-2 block hover:text-mark">{t.nav[4][1]}</a>
            <a href="#trabajos" className="mt-2 block hover:text-mark">{t.nav[3][1]}</a>
          </div>
          <div>
            <p className="font-semibold text-ink dark:text-white">{t.policies}</p>
            <a href="https://nexgentech.netlify.app/politicas-de-privacidad" target="_blank" rel="noreferrer" className="mt-3 block hover:text-mark">{t.privacy}</a>
            <a href="https://nexgentech.netlify.app/politicas-de-cookies" target="_blank" rel="noreferrer" className="mt-2 block hover:text-mark">{t.cookies}</a>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-6xl text-center">{t.rights}</p>
      </footer>

      <a href={`https://wa.me/${wsp}`} className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-mark text-white shadow-xl" aria-label="WhatsApp">
        <HiOutlineChat className="text-2xl" />
      </a>

      {modal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 p-4" onClick={() => setModal(false)}>
          <div
            className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#1a1028]"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
          >
            <button type="button" onClick={() => setModal(false)} className="absolute right-4 top-4 text-2xl font-light text-ink dark:text-white" aria-label={t.close}>
              <HiOutlineX />
            </button>
            <h3 id="confirm-title" className="pr-8 text-xl font-bold text-ink dark:text-white">{t.confirmTitle}</h3>
            <p className="mt-1 text-sm text-neutral-500">
              {t.selected} <strong className="text-ink dark:text-white">{form.plan}</strong>
            </p>
            <div className="mt-4 border-t border-slate-200 pt-4 text-sm text-neutral-600 dark:border-violet-900 dark:text-violet-200">
              <p className="font-medium text-ink dark:text-white">{t.detail}</p>
              <ul className="mt-2 space-y-1">
                {planLines().map((line) => (
                  <li key={line}>— {line}</li>
                ))}
              </ul>
            </div>
            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              <label className="block text-sm font-semibold text-ink dark:text-white">
                {t.fullName}
                <input required name="name" placeholder={t.namePh} value={form.name} onChange={onChange} className="field" />
              </label>
              <label className="block text-sm font-semibold text-ink dark:text-white">
                {t.email.replace(' *', '')}
                <input required type="email" name="email" placeholder={t.emailPh} value={form.email} onChange={onChange} className="field" />
              </label>
              <label className="block text-sm font-semibold text-ink dark:text-white">
                {t.message.replace(' *', '')}
                <textarea name="message" rows={4} placeholder={t.msgPh} value={form.message} onChange={onChange} className="field" />
              </label>
              <button disabled={status === 'sending'} type="submit" className="rounded-full bg-mark px-8 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
                {status === 'sending' ? t.sending : t.sendShort}
              </button>
              {status === 'ok' && <p className="text-sm text-green-600">{t.ok}</p>}
              {status === 'error' && <p className="text-sm text-red-500">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
