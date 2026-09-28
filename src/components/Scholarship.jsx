import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GraduationCap, Users, BookOpenCheck, Percent, Brain, UserCheck, BarChart3 } from 'lucide-react'
import Eyebrow from './ui/Eyebrow'
import Reveal from './ui/Reveal'
import Button from './ui/Button'
import CountUp from './ui/CountUp'

const whoCanApply = [
  {
    icon: GraduationCap,
    title: 'Class 11, Class 12 or junior college students',
    note: 'Including students taking a drop year',
  },
  {
    icon: Users,
    title: 'From economically weaker or underprivileged families',
    note: 'Income documents are verified after shortlisting',
  },
  {
    icon: BookOpenCheck,
    title: 'Preparing for JEE or NEET',
    note: 'In English or Hindi medium',
  },
]

const whatYouGet = [
  {
    icon: Percent,
    title: '85% off the programme fee',
    note: 'For selected scholars',
  },
  {
    icon: Brain,
    title: 'AI-powered personalised learning',
    note: 'Study plans that adapt to your strengths and gaps',
  },
  {
    icon: UserCheck,
    title: 'Mentorship from experienced educators',
    note: 'Doubt support and regular guidance',
  },
  {
    icon: BarChart3,
    title: 'Mock tests and performance insights',
    note: 'Know exactly where you stand before exam day',
  },
]

export default function Scholarship() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const blobY = useTransform(scrollYProgress, [0, 1], [-80, 80])
  const bgY = useTransform(scrollYProgress, [0, 1], [-60, 60])

  return (
    <section
      ref={sectionRef}
      id="scholarship"
      className="relative overflow-hidden bg-navy-950 py-24 lg:py-32"
    >
      {/* full-bleed background photo */}
      <motion.img
        style={{ y: bgY, scale: 1.15 }}
        src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1800&h=1200&q=80"
        alt="A vast library, representing the world of learning scholars step into"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-navy-950/55" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-navy-950 via-navy-950/65 to-navy-950/15" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-950 via-transparent to-navy-950/30" />
      <div className="noise-overlay pointer-events-none absolute inset-0" />

      <motion.div
        style={{ y: blobY }}
        className="pointer-events-none absolute top-0 right-0 h-[28rem] w-[28rem] rounded-full bg-amber-500/15 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <Eyebrow dark>Skillzza × Earth Care Foundation</Eyebrow>
            <h2 className="text-balance mt-5 font-display text-4xl font-bold text-cream-50 sm:text-[2.6rem]">
              Up to{' '}
              <span className="text-amber-400">
                <CountUp to={85} suffix="%" />
              </span>{' '}
              off for eligible scholars
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream-100/70">
              Through the Skillzza × Earth Care Foundation initiative, eligible students can
              access selected programmes at up to 85% discounted fees.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Button as="a" href="#apply">
                Apply for Scholarship
              </Button>
            </div>

            <p className="mt-6 max-w-sm text-[13px] leading-relaxed text-cream-100/50">
              Seats are limited. Scholarships are awarded on eligibility and verification, in
              order of registration.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal
              delay={0.1}
              className="rounded-2xl border border-cream-50/15 bg-navy-950/50 p-6 shadow-xl shadow-navy-950/30 backdrop-blur-md"
            >
              <h3 className="font-display text-lg font-bold text-cream-50">Who can apply</h3>
              <ul className="mt-5 flex flex-col gap-5">
                {whoCanApply.map(({ icon: Icon, title, note }) => (
                  <li key={title} className="flex gap-3.5">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-500/15">
                      <Icon size={17} className="text-amber-400" />
                    </div>
                    <div>
                      <p className="text-[14.5px] font-semibold text-cream-50">{title}</p>
                      <p className="mt-0.5 text-[13px] text-cream-100/55">{note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal
              delay={0.18}
              className="rounded-2xl border border-amber-400/25 bg-amber-500/10 p-6 shadow-xl shadow-navy-950/30 backdrop-blur-md"
            >
              <h3 className="font-display text-lg font-bold text-cream-50">What you get</h3>
              <ul className="mt-5 flex flex-col gap-5">
                {whatYouGet.map(({ icon: Icon, title, note }) => (
                  <li key={title} className="flex gap-3.5">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-400">
                      <Icon size={17} className="text-navy-950" />
                    </div>
                    <div>
                      <p className="text-[14.5px] font-semibold text-cream-50">{title}</p>
                      <p className="mt-0.5 text-[13px] text-cream-100/55">{note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
