import { useEffect } from 'react'
import HalloweenNight from './HalloweenNight'
import {
  ChristmasNight,
  NewYearNight,
  PatrioticNight,
  ValentineNight,
} from './HolidayStage'

export default function SeasonDecor({ season, copy }) {
  const text = season ? copy[season.id] : null

  useEffect(() => {
    if (!season) return undefined
    const onClick = (event) => {
      const target = event.target.closest('button, a')
      if (!target || target.closest('.season-toy, .hw-pumpkin')) return
      if (!target.classList.contains('bg-mark') && target.getAttribute('type') !== 'submit') return
      window.dispatchEvent(new Event('wn-season-fx'))
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [season])

  if (!season || !text) return null

  return (
    <>
      {season.id === 'halloween' && <HalloweenNight copy={text} />}
      {season.id === 'christmas' && <ChristmasNight copy={text} />}
      {season.id === 'newyear' && <NewYearNight copy={text} />}
      {season.id === 'dieciocho' && <PatrioticNight copy={text} />}
      {season.id === 'valentine' && <ValentineNight copy={text} />}
    </>
  )
}
