import { useEffect, useRef, useState } from 'react'

const faces = ['grin', 'wink', 'boo']

function Pumpkin({ face }) {
  return (
    <svg viewBox="0 0 120 120" className="hw-pumpkin-svg" aria-hidden="true">
      <ellipse cx="60" cy="68" rx="48" ry="40" fill="#ea580c" />
      <ellipse cx="38" cy="68" rx="22" ry="38" fill="#c2410c" opacity="0.45" />
      <ellipse cx="82" cy="68" rx="22" ry="38" fill="#c2410c" opacity="0.35" />
      <path d="M58 18c0 14 8 22 8 22s-12 2-16-8 2-18 8-14z" fill="#166534" />
      {face === 'grin' && (
        <>
          <polygon points="38,52 50,64 28,64" fill="#1c1917" />
          <polygon points="82,52 94,64 70,64" fill="#1c1917" />
          <path d="M32 80 Q60 102 88 80 Q60 92 32 80" fill="#1c1917" />
          <rect x="42" y="82" width="6" height="10" fill="#fbbf24" />
          <rect x="57" y="84" width="6" height="10" fill="#fbbf24" />
          <rect x="72" y="82" width="6" height="10" fill="#fbbf24" />
        </>
      )}
      {face === 'wink' && (
        <>
          <path d="M30 58 Q40 50 50 58" fill="none" stroke="#1c1917" strokeWidth="4" />
          <polygon points="82,50 94,64 70,64" fill="#1c1917" />
          <circle cx="60" cy="86" r="10" fill="#1c1917" />
        </>
      )}
      {face === 'boo' && (
        <>
          <ellipse cx="42" cy="58" rx="10" ry="14" fill="#1c1917" />
          <ellipse cx="78" cy="58" rx="10" ry="14" fill="#1c1917" />
          <circle cx="45" cy="55" r="3" fill="#fbbf24" />
          <circle cx="81" cy="55" r="3" fill="#fbbf24" />
          <ellipse cx="60" cy="88" rx="16" ry="12" fill="#1c1917" />
        </>
      )}
    </svg>
  )
}

function Bat() {
  return (
    <svg viewBox="0 0 64 28" className="hw-bat-svg" aria-hidden="true">
      <path fill="currentColor" d="M32 18c-2-8 4-14 8-8 6-10 18-6 14 2-8 2-10 6-14 8 4 6-2 10-8 4-6 6-12 2-8-4-4-2-6-6-14-8-4-8 8-12 14-2 4-6 10 0 8 8z" />
    </svg>
  )
}

export default function HalloweenNight({ copy }) {
  const [face, setFace] = useState('grin')
  const [boo, setBoo] = useState(false)
  const [sparks, setSparks] = useState([])
  const faceRef = useRef('grin')

  const scare = () => {
    const next = faces[(faces.indexOf(faceRef.current) + 1) % faces.length]
    faceRef.current = next
    setFace(next)
    document.documentElement.classList.add('is-fx-halloween')
    window.setTimeout(() => document.documentElement.classList.remove('is-fx-halloween'), 500)
    if (next === 'boo') {
      setBoo(true)
      window.setTimeout(() => setBoo(false), 700)
    }
    const extra = Array.from({ length: 5 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      left: 10 + i * 8,
    }))
    setSparks((prev) => [...prev, ...extra])
    window.setTimeout(() => setSparks((prev) => prev.slice(extra.length)), 1600)
  }

  useEffect(() => {
    const onFx = () => scare()
    window.addEventListener('wn-season-fx', onFx)
    return () => window.removeEventListener('wn-season-fx', onFx)
  }, [])

  return (
    <div className="hw-night">
      <div className="hw-fog" aria-hidden="true" />
      <div className="hw-eyes" aria-hidden="true">
        <i />
        <b />
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className={`hw-bat hw-bat-${i + 1}`} aria-hidden="true">
          <Bat />
        </span>
      ))}
      <button type="button" className={`hw-pumpkin ${boo ? 'is-boo' : ''}`} onClick={scare} aria-label={copy.pumpkin}>
        <Pumpkin face={face} />
      </button>
      {boo && <div className="hw-boo" aria-hidden="true">BOO</div>}
      {sparks.map((spark) => (
        <span key={spark.id} className="hw-spark" style={{ left: `${spark.left}%` }} aria-hidden="true" />
      ))}
    </div>
  )
}
