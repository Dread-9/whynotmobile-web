import { FaAndroid, FaStar } from 'react-icons/fa'
import { HiOutlineShieldCheck, HiOutlineUsers, HiOutlineDatabase } from 'react-icons/hi'

const playUrl = 'https://play.google.com/store/apps/details?id=com.nexgentech.petpaloozaa'
const shots = [1, 2, 3, 4].map((n) => `/apps/petpalooza/screen-${n}.png`)

export default function PetPalooza({ t }) {
  const p = t.pet

  return (
    <main className="bg-white dark:bg-[#120c1c]">
      <section className="border-b border-violet-100 bg-mist px-6 py-10 dark:border-violet-900 dark:bg-[#1a1028]">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center">
          <img src="/apps/petpalooza/icon.png" alt="PetPalooza" className="h-28 w-28 rounded-[1.75rem] bg-white shadow-md ring-1 ring-violet-100" />
          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mark">{p.byWhyNot}</p>
            <h1 className="mt-1 text-4xl font-semibold text-ink dark:text-white">PetPalooza</h1>
            <p className="mt-1 text-mark">{p.dev}</p>
            <p className="mt-1 text-sm text-neutral-500">{p.ads}</p>
            <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-ink dark:text-violet-100">
              <span className="flex items-center gap-1 font-semibold">
                5.0 <FaStar className="text-amber-400" />
                <span className="font-normal text-neutral-500">{p.reviews}</span>
              </span>
              <span>{p.installs}</span>
              <span className="inline-flex items-center gap-1">
                <FaAndroid className="text-[#3ddc84]" /> {p.devices}
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={playUrl} target="_blank" rel="noreferrer" className="rounded-full bg-mark px-6 py-3 text-sm font-semibold text-white">
                {t.seePlay}
              </a>
              <a href="#inicio" className="rounded-full px-6 py-3 text-sm font-semibold text-mark ring-1 ring-violet-200">
                {p.back}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl font-semibold text-ink dark:text-white">{p.shots}</h2>
          <div className="mt-5 flex gap-4 overflow-x-auto pb-4">
            {shots.map((src) => (
              <img key={src} src={src} alt="PetPalooza" className="h-[420px] w-auto shrink-0 rounded-3xl object-cover shadow-md ring-1 ring-violet-100" />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-ink dark:text-white">{p.aboutTitle}</h2>
            <p className="mt-3 leading-7 text-neutral-600 dark:text-violet-200/80">{p.about}</p>
            <p className="mt-4 text-sm text-neutral-400">{p.updated}</p>
            <p className="mt-4 text-sm text-neutral-500 dark:text-violet-300">{p.stack}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-ink dark:text-white">{p.safety}</h2>
            <p className="mt-2 text-sm text-neutral-500 dark:text-violet-200/80">{p.safetyLead}</p>
            <ul className="mt-5 space-y-4 text-sm text-neutral-600 dark:text-violet-200">
              <li className="flex gap-3">
                <HiOutlineUsers className="mt-0.5 shrink-0 text-xl text-mark" />
                {p.noShare}
              </li>
              <li className="flex gap-3">
                <HiOutlineDatabase className="mt-0.5 shrink-0 text-xl text-mark" />
                {p.noCollect}
              </li>
              <li className="flex gap-3">
                <HiOutlineShieldCheck className="mt-0.5 shrink-0 text-xl text-mark" />
                {p.families}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-violet-100 px-6 py-12 dark:border-violet-900">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl font-semibold text-ink dark:text-white">{p.ratings}</h2>
          <div className="mt-6 flex flex-wrap items-end gap-8">
            <div>
              <p className="text-5xl font-semibold text-ink dark:text-white">5.0</p>
              <p className="mt-1 flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </p>
              <p className="mt-1 text-sm text-neutral-500">{p.reviews}</p>
            </div>
            <div className="min-w-[220px] flex-1 space-y-1.5 text-xs text-neutral-500">
              {[5, 4, 3, 2, 1].map((n) => (
                <div key={n} className="flex items-center gap-2">
                  <span className="w-3">{n}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-violet-100 dark:bg-violet-950">
                    <div className={`h-full rounded-full bg-mark ${n === 5 ? 'w-full' : 'w-0'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <article className="mt-10 max-w-2xl rounded-3xl bg-mist p-6 dark:bg-[#1a1028]">
            <p className="font-semibold text-ink dark:text-white">{p.reviewName}</p>
            <p className="text-xs text-neutral-400">{p.reviewDate}</p>
            <p className="mt-1 flex text-sm text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </p>
            <p className="mt-3 text-neutral-600 dark:text-violet-200">{p.review}</p>
            <div className="mt-5 border-l-2 border-mark pl-4">
              <p className="text-sm font-semibold text-mark">{p.dev}</p>
              <p className="text-xs text-neutral-400">{p.reviewDate}</p>
              <p className="mt-2 text-sm text-neutral-600 dark:text-violet-200">{p.reply}</p>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
