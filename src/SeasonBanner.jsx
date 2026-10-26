import { NewYearCount } from './HolidayStage'

function nyYear() {
  const now = new Date()
  return now.getMonth() === 0 ? now.getFullYear() : now.getFullYear() + 1
}

function Deco({ id, side }) {
  if (id === 'newyear') {
    return side === 'l' ? (
      <svg viewBox="0 0 90 110" className="festive-deco-svg">
        <rect x="38" y="8" width="16" height="28" rx="8" fill="#f59e0b" />
        <rect x="34" y="34" width="24" height="52" rx="8" fill="#7c3aed" />
        <ellipse cx="46" cy="88" rx="18" ry="8" fill="#f59e0b" />
        <circle cx="18" cy="22" r="3" fill="#4ade80" />
        <circle cx="72" cy="18" r="2.5" fill="#f472b6" />
        <path d="M12 40 l8 0 m-4 -4 l0 8" stroke="#fbbf24" strokeWidth="2" />
        <path d="M78 48 l8 0 m-4 -4 l0 8" stroke="#38bdf8" strokeWidth="2" />
      </svg>
    ) : (
      <svg viewBox="0 0 90 110" className="festive-deco-svg">
        <circle cx="48" cy="36" r="22" fill="#7c3aed" />
        <circle cx="48" cy="36" r="14" fill="#4ade80" />
        <circle cx="48" cy="36" r="6" fill="#fbbf24" />
        <path d="M22 86 q8 -22 18 -8 t16 4 t18 -10" fill="none" stroke="#f59e0b" strokeWidth="4" />
        <rect x="18" y="78" width="8" height="22" rx="3" fill="#fbbf24" />
        <rect x="64" y="74" width="8" height="26" rx="3" fill="#fbbf24" />
      </svg>
    )
  }
  if (id === 'christmas') {
    return (
      <svg viewBox="0 0 80 100" className="festive-deco-svg">
        <polygon points="40,6 64,40 16,40" fill="#16a34a" />
        <polygon points="40,28 70,72 10,72" fill="#15803d" />
        <rect x="36" y="72" width="8" height="16" fill="#7c4a1e" />
        <polygon points="40,2 44,12 54,14 46,20 48,30 40,24 32,30 34,20 26,14 36,12" fill="#fbbf24" />
      </svg>
    )
  }
  if (id === 'halloween') {
    return (
      <svg viewBox="0 0 90 90" className="festive-deco-svg">
        <ellipse cx="45" cy="52" rx="28" ry="24" fill="#ea580c" />
        <path d="M42 18c0 10 8 16 8 16s-10 0-14-8 4-14 6-8z" fill="#166534" />
        <polygon points="32,44 40,54 26,54" fill="#1c1917" />
        <polygon points="58,44 66,54 50,54" fill="#1c1917" />
        <path d="M28 62 q17 14 34 0 q-17 8 -34 0" fill="#1c1917" />
      </svg>
    )
  }
  if (id === 'dieciocho') {
    return (
      <svg viewBox="0 0 90 60" className="festive-deco-svg">
        <rect width="90" height="30" fill="#fff" />
        <rect y="30" width="90" height="30" fill="#d52b1e" />
        <rect width="30" height="30" fill="#0039a6" />
        <polygon fill="#fff" points="15,5 17,11 24,11 18,15 20,21 15,17 10,21 12,15 6,11 13,11" />
      </svg>
    )
  }
  if (id === 'valentine') {
    return (
      <svg viewBox="0 0 80 72" className="festive-deco-svg">
        <path fill="#e11d48" d="M40 66 C8 42 8 18 24 10c10-6 16 2 16 10 0-8 6-16 16-10 16 8 16 32-16 56z" />
      </svg>
    )
  }
  return null
}

export default function SeasonBanner({ season, copy }) {
  if (!season || !copy) return null
  const ny = season.id === 'newyear'

  return (
    <div className={`festive-banner festive-banner-${season.id}`}>
      <div className="festive-lights" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <i key={i} style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
      </div>
      <div className="festive-banner-inner">
        <Deco id={season.id} side="l" />
        <div className="festive-banner-copy">
          {ny ? (
            <>
              <span className="festive-kicker">Happy</span>
              <strong className="festive-year">{nyYear()}</strong>
              <span className="festive-sub">{copy.toast}</span>
              <NewYearCount copy={copy} className="ny-count-banner" />
            </>
          ) : (
            <>
              <strong>{copy.title}</strong>
              <span>{copy.line}</span>
            </>
          )}
        </div>
        <Deco id={season.id} side="r" />
      </div>
    </div>
  )
}
