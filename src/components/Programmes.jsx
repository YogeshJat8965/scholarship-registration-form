import { useState } from 'react'
import { ArrowUpRight, Check, RotateCw } from 'lucide-react'
import { programmes } from '../data/programmes'
import Reveal from './ui/Reveal'

export default function Programmes() {
  return (
    <section id="programmes" className="bg-cream-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[13px] font-semibold tracking-wide text-amber-700 uppercase">
            Learn. Prepare. Progress.
          </p>
          <h2 className="text-balance mt-5 font-display text-4xl font-bold text-navy-950 sm:text-[2.75rem]">
            Our Programmes covered
          </h2>
          <p className="mt-4 text-[15.5px] text-navy-500">
            Choose the exam you are preparing for. Classes are available in English and Hindi
            .
          </p>
          
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programmes.map((programme, i) => (
            <Reveal key={programme.id} delay={(i % 4) * 0.06} className="h-full">
              <FlipCard programme={programme} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FlipCard({ programme }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="group h-[340px] cursor-pointer [perspective:1600px]"
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        style={flipped ? { transform: 'rotateY(180deg)' } : undefined}
        className="relative h-full w-full rounded-2xl transition-transform duration-700 ease-[cubic-bezier(0.4,0.15,0.15,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
      >
        {/* front */}
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-cream-50 shadow-sm [backface-visibility:hidden]">
          <div className="relative h-[200px] shrink-0 overflow-hidden">
            <img
              src={programme.image}
              alt={programme.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy-950/50 via-transparent to-transparent" />

            <div className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full bg-cream-50/15 text-cream-50 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <RotateCw size={14} />
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-center px-5 py-4">
            <h3 className="font-display text-lg leading-snug font-bold text-navy-950">
              {programme.title}
            </h3>
            <p className="mt-1.5 text-[13.5px] font-medium text-amber-600">{programme.tagline}</p>
          </div>
        </div>

        {/* back */}
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-cream-50 shadow-xl shadow-navy-900/10 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-navy-100 blur-3xl" />

          <div className="relative min-h-0 flex-1">
            <div className="h-full overflow-y-auto p-5">
              <p className="text-[12px] font-bold tracking-wider text-amber-600 uppercase">
                {programme.listLabel}
              </p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {programme.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-amber-100">
                      <Check size={10} strokeWidth={3} className="text-amber-600" />
                    </span>
                    <span className="text-[13px] leading-snug text-navy-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-cream-50 to-transparent" />
          </div>

          <a
            href="#apply"
            onClick={(e) => e.stopPropagation()}
            className="relative flex shrink-0 items-center justify-between border-t border-navy-100 bg-navy-950 px-6 py-4 text-sm font-bold text-amber-400 transition-colors hover:bg-navy-800 hover:text-amber-300"
          >
            {programme.cta}
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}
