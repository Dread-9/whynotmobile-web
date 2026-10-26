function atMidnight(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function nthWeekday(year, monthIndex, weekday, n) {
  const first = new Date(year, monthIndex, 1).getDay()
  const offset = (weekday - first + 7) % 7
  return new Date(year, monthIndex, 1 + offset + (n - 1) * 7)
}

function around(day, spread = 3) {
  const start = new Date(day)
  start.setDate(start.getDate() - spread)
  const end = new Date(day)
  end.setDate(end.getDate() + spread)
  return [start, end]
}

function between(date, a, b) {
  return date >= a && date <= b
}

const themes = ['halloween', 'christmas', 'newyear', 'dieciocho', 'valentine', 'mother', 'child']

export function getSeason(now = new Date()) {
  if (typeof window !== 'undefined') {
    const tema = new URLSearchParams(window.location.search).get('tema')
    if (themes.includes(tema)) return { id: tema }
  }
  const date = atMidnight(now)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()

  if ((m === 12 && d >= 22) || (m === 1 && d <= 7)) return { id: 'newyear' }
  if (m === 12 && d <= 21) return { id: 'christmas' }
  if (m === 10 && d >= 25) return { id: 'halloween' }
  if (m === 9) return { id: 'dieciocho' }

  const [vStart, vEnd] = [new Date(y, 1, 10), new Date(y, 1, 16)]
  if (between(date, vStart, vEnd)) return { id: 'valentine' }

  const [momStart, momEnd] = around(nthWeekday(y, 4, 0, 2), 3)
  if (between(date, momStart, momEnd)) return { id: 'mother' }

  const [kidStart, kidEnd] = around(nthWeekday(y, 7, 3, 2), 3)
  if (between(date, kidStart, kidEnd)) return { id: 'child' }

  return null
}
