import { useEffect, useRef, useState } from 'react'

function useFx(play) {
  const playRef = useRef(play)
  playRef.current = play
  useEffect(() => {
    const onFx = () => playRef.current()
    window.addEventListener('wn-season-fx', onFx)
    return () => window.removeEventListener('wn-season-fx', onFx)
  }, [])
}

function Toy({ className, label, onClick, children }) {
  return (
    <button type="button" className={`season-toy ${className}`} onClick={onClick} aria-label={label}>
      {children}
    </button>
  )
}

export function ChristmasNight({ copy }) {
  const [lit, setLit] = useState(false)
  const [flash, setFlash] = useState(false)
  const play = () => {
    setLit(true)
    setFlash(true)
    document.documentElement.classList.add('is-fx-christmas')
    window.setTimeout(() => {
      setFlash(false)
      document.documentElement.classList.remove('is-fx-christmas')
    }, 900)
  }
  useFx(play)

  return (
    <div className="xm-night">
      <div className="xm-snowground" aria-hidden="true" />
      <svg className="xm-garland" viewBox="0 0 800 72" aria-hidden="true">
        <path d="M8 18 C 70 48, 130 6, 190 28 S 310 8, 390 30 530 4, 610 26 730 8, 792 22" fill="none" stroke="#166534" strokeWidth="3.5" />
        {[80, 160, 240, 320, 400, 480, 560, 640, 720].map((x, i) => (
          <g key={x} transform={`translate(${x} ${18 + (i % 3) * 8}) rotate(${i % 2 ? 22 : -22})`}>
            <ellipse cx="-10" cy="10" rx="16" ry="7" fill={i % 2 ? '#15803d' : '#16a34a'} />
            <ellipse cx="10" cy="12" rx="15" ry="7" fill={i % 2 ? '#166534' : '#15803d'} />
            <circle cx="-2" cy="16" r="3.2" fill="#b91c1c" />
            <circle cx="6" cy="18" r="3" fill="#dc2626" />
            <circle cx="2" cy="22" r="2.6" fill="#b91c1c" />
          </g>
        ))}
      </svg>
      {Array.from({ length: 22 }).map((_, i) => (
        <i
          key={i}
          className="xm-flake"
          style={{
            left: `${(i * 11) % 100}%`,
            animationDelay: `${(i * 0.3) % 5}s`,
            animationDuration: `${7 + (i % 5)}s`,
          }}
        />
      ))}
      <Toy className={`xm-tree ${lit ? 'is-lit' : ''}`} label={copy.tree} onClick={play}>
        <svg viewBox="0 0 120 140" className="xm-tree-svg" aria-hidden="true">
          <rect x="54" y="112" width="12" height="18" rx="2" fill="#7c4a1e" />
          <polygon points="60,8 96,48 24,48" fill="#15803d" />
          <polygon points="60,28 104,78 16,78" fill="#16a34a" />
          <polygon points="60,52 110,118 10,118" fill="#166534" />
          <polygon points="60,2 66,14 78,16 68,24 72,36 60,28 48,36 52,24 42,16 54,14" fill="#fbbf24" />
          {lit && (
            <>
              <circle cx="48" cy="46" r="4" fill="#ef4444" />
              <circle cx="72" cy="42" r="4" fill="#38bdf8" />
              <circle cx="40" cy="72" r="4" fill="#fbbf24" />
              <circle cx="80" cy="76" r="4" fill="#ef4444" />
            </>
          )}
        </svg>
      </Toy>
      {flash && <div className="season-flash">HO HO HO</div>}
    </div>
  )
}

function newYearTarget(now) {
  const year = now.getMonth() === 0 ? now.getFullYear() : now.getFullYear() + 1
  return new Date(year, 0, 1, 0, 0, 0)
}

function splitTime(ms) {
  const safe = Math.max(0, ms)
  const s = Math.floor(safe / 1000)
  return {
    days: String(Math.floor(s / 86400)).padStart(2, '0'),
    hours: String(Math.floor((s % 86400) / 3600)).padStart(2, '0'),
    minutes: String(Math.floor((s % 3600) / 60)).padStart(2, '0'),
    seconds: String(s % 60).padStart(2, '0'),
    done: safe <= 0,
  }
}

const nyColors = ['#fbbf24', '#f472b6', '#38bdf8', '#4ade80', '#f97316', '#e879f9']

export function NewYearCount({ copy, className = '' }) {
  const [left, setLeft] = useState(() => splitTime(newYearTarget(new Date()) - Date.now()))

  useEffect(() => {
    const tick = () => setLeft(splitTime(newYearTarget(new Date()) - Date.now()))
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <button
      type="button"
      className={`ny-count ${className}`.trim()}
      onClick={() => window.dispatchEvent(new Event('wn-season-fx'))}
      aria-label={copy.toast}
    >
      <span className="ny-count-year">{left.done ? copy.now : copy.toast}</span>
      <span className="ny-count-row">
        <b>{left.days}</b><i>d</i>
        <b>{left.hours}</b><i>h</i>
        <b>{left.minutes}</b><i>m</i>
        <b>{left.seconds}</b><i>s</i>
      </span>
    </button>
  )
}

export function NewYearNight() {
  const [flash, setFlash] = useState(false)
  const play = () => {
    setFlash(true)
    document.documentElement.classList.add('is-fx-newyear')
    window.setTimeout(() => {
      setFlash(false)
      document.documentElement.classList.remove('is-fx-newyear')
    }, 1600)
  }
  useFx(play)

  if (!flash) return null

  return (
    <div className="ny-night is-burst">
      <div className="ny-sky" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <i
            key={`fw-${i}`}
            className="ny-fw"
            style={{
              left: `${8 + (i * 9) % 84}%`,
              top: `${8 + (i * 11) % 48}%`,
              color: nyColors[i % nyColors.length],
              background: nyColors[i % nyColors.length],
              animationDelay: `${(i * 0.08) % 0.6}s`,
              animationDuration: `${0.9 + (i % 3) * 0.2}s`,
            }}
          />
        ))}
        {Array.from({ length: 18 }).map((_, i) => (
          <b
            key={`sp-${i}`}
            className="ny-serp"
            style={{
              left: `${(i * 6 + 4) % 96}%`,
              background: nyColors[i % nyColors.length],
              animationDelay: `${(i * 0.05) % 0.4}s`,
              animationDuration: `${1.6 + (i % 4) * 0.25}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function ChileFlag({ className = 'd18-mini' }) {
  return (
    <svg viewBox="0 0 180 120" className={className} aria-hidden="true">
      <rect width="180" height="60" fill="#ffffff" />
      <rect y="60" width="180" height="60" fill="#d52b1e" />
      <rect width="60" height="60" fill="#0039a6" />
      <polygon fill="#ffffff" points="30,10 33.5,21.5 45.5,21.5 35.8,28.5 39.2,40 30,33.2 20.8,40 24.2,28.5 14.5,21.5 26.5,21.5" />
    </svg>
  )
}

function ChileIcons() {
  return (
    <div className="d18-icons" aria-hidden="true">
      <svg viewBox="0 0 48 48" className="d18-icon">
        <polygon points="24,4 44,20 24,44 4,20" fill="#d52b1e" />
        <polygon points="24,10 36,20 24,38 12,20" fill="#0039a6" />
        <line x1="24" y1="44" x2="24" y2="48" stroke="#7c4a1e" strokeWidth="2" />
      </svg>
      <svg viewBox="0 0 48 48" className="d18-icon">
        <ellipse cx="24" cy="28" rx="16" ry="10" fill="#eab308" />
        <path d="M8 28 Q24 8 40 28" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
        <path d="M14 26 Q24 16 34 26" fill="none" stroke="#92400e" strokeWidth="1.2" />
      </svg>
      <svg viewBox="0 0 48 48" className="d18-icon">
        <ellipse cx="24" cy="28" rx="8" ry="12" fill="#b91c1c" />
        <ellipse cx="16" cy="20" rx="7" ry="11" fill="#dc2626" transform="rotate(-28 16 20)" />
        <ellipse cx="32" cy="20" rx="7" ry="11" fill="#dc2626" transform="rotate(28 32 20)" />
        <circle cx="24" cy="26" r="3" fill="#fff" />
      </svg>
      <svg viewBox="0 0 48 48" className="d18-icon">
        <ellipse cx="24" cy="18" rx="16" ry="6" fill="#7c4a1e" />
        <rect x="16" y="18" width="16" height="10" fill="#5b3414" />
        <ellipse cx="24" cy="30" rx="9" ry="4" fill="#7c4a1e" />
      </svg>
    </div>
  )
}

export function PatrioticNight({ copy }) {
  const [flash, setFlash] = useState(false)
  const [music, setMusic] = useState(false)
  const play = () => {
    setFlash(true)
    document.documentElement.classList.add('is-fx-dieciocho')
    window.setTimeout(() => {
      setFlash(false)
      document.documentElement.classList.remove('is-fx-dieciocho')
    }, 900)
  }
  useFx(play)

  return (
    <div className="d18-night">
      <div className="d18-dock">
        <Toy className="d18-toy" label={copy.flag} onClick={play}>
          <ChileFlag className="d18-svg" />
        </Toy>
        <div className="d18-side">
          <ChileIcons />
          <button type="button" className="d18-music" onClick={() => setMusic((v) => !v)}>
            {music ? copy.musicOff : copy.music}
          </button>
          <span className="d18-viva">¡Viva el 18!</span>
        </div>
      </div>
      {music && (
        <iframe
          className="d18-player"
          title={copy.music}
          src="https://www.youtube-nocookie.com/embed/videoseries?list=PLB130D4F42A36B71E&autoplay=1"
          allow="autoplay; encrypted-media"
        />
      )}
      {flash && (
        <div className="season-flash d18-flash">
          <ChileFlag className="d18-flash-flag" />
        </div>
      )}
    </div>
  )
}

export function ValentineNight({ copy }) {
  const [flash, setFlash] = useState(false)
  const play = () => {
    setFlash(true)
    document.documentElement.classList.add('is-fx-valentine')
    window.setTimeout(() => {
      setFlash(false)
      document.documentElement.classList.remove('is-fx-valentine')
    }, 900)
  }
  useFx(play)

  return (
    <div className="vl-night">
      {Array.from({ length: 8 }).map((_, i) => (
        <i
          key={i}
          className="vl-heart"
          style={{
            left: `${10 + (i * 11) % 80}%`,
            animationDelay: `${i * 0.45}s`,
            animationDuration: `${7 + (i % 3)}s`,
          }}
        />
      ))}
      <Toy label={copy.heart} onClick={play}>
        <svg viewBox="0 0 120 110" className="vl-svg" aria-hidden="true">
          <path fill="#e11d48" d="M60 96 C10 62 8 28 32 16c14-8 24 2 28 12 4-10 14-20 28-12 24 12 22 46-28 80z" />
        </svg>
      </Toy>
      {flash && <div className="season-flash vl-flash">LOVE</div>}
    </div>
  )
}
