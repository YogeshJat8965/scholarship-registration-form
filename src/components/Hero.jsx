import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Button from './ui/Button'
import Eyebrow from './ui/Eyebrow'
import CountUp from './ui/CountUp'
import Typewriter from './ui/Typewriter'
import Marquee from './ui/Marquee'

const examBadges = [
  'JEE',
  'NEET',
  'SSC',
  'Railways',
  'Banking',
  'English Speaking',
  'Personality Development',
]

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mq.matches)
    const handler = (e) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const imageY = useTransform(scrollYProgress, [0, 1], isDesktop ? [0, 140] : [0, 0])
  const collageY = useTransform(scrollYProgress, [0, 1], isDesktop ? [0, 70] : [0, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], isDesktop ? [0, -40] : [0, 0])

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden bg-cream-50 pt-32 pb-24 lg:pt-40 lg:pb-32"
    >

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:px-10">
        <motion.div style={{ y: contentY }}>
          {/* <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Eyebrow dark>Skillzza Scholarship & Career Preparation 2026</Eyebrow>
          </motion.div> */}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-balance mt-6 font-display text-[2.6rem] leading-[1.1] font-bold text-navy-950 sm:text-5xl lg:text-[3.4rem]"
          >
            Your future should be shaped by your{' '}
            <span className="relative text-amber-600">
              potential
              <svg
                className="absolute -bottom-1 left-0 w-full text-amber-500/60"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9C40 2 160 2 198 9"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            , not your circumstances.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg font-medium text-navy-800"
          >
            Scholarships and affordable career-focused learning for students and aspiring
            professionals.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-navy-500"
          >
            Whether you're preparing for JEE, NEET, SSC, Railways or Banking exams, or building
            the communication and professional skills needed for your next opportunity, Skillzza
            brings structured learning, expert guidance and technology-powered preparation within
            reach.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36 }}
            className="mt-7 flex min-h-9 items-center border-l-2 border-amber-500/60 pl-4"
          >
            <Typewriter
              text="मेहनत आपकी, साथ हमारा।"
              className="font-hindi text-2xl text-amber-600"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.44 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button as="a" href="#apply">
              Apply Now
            </Button>
            <Button as="a" href="#programmes" variant="outlineLight">
              Explore Courses
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* animated aurora glow ring behind the image */}
          <motion.div
            aria-hidden="true"
            className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[conic-gradient(from_0deg,theme(colors.amber.500/40%),theme(colors.navy.500/10%),theme(colors.amber.400/30%),theme(colors.amber.500/40%))] opacity-70 blur-3xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-linear-to-br from-amber-500/30 to-transparent blur-2xl" />

          <motion.div
            initial={{ opacity: 0, x: 16, rotate: 6 }}
            animate={{ opacity: 1, x: 0, rotate: 6 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ y: collageY }}
            className="absolute -top-16 -right-6 z-10 hidden w-44 sm:block"
          >
            <div className="overflow-hidden rounded-2xl border-4 border-cream-50 shadow-xl">
              <img
                src="/girl%20smiling.png"
                alt="A confident student ready to build her future"
                className="h-52 w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div style={{ y: imageY }}>
            <div className="relative overflow-hidden rounded-[1.75rem] shadow-2xl shadow-navy-900/20">
              <img
                src="/hero_biggerImg.png"
                alt="A group of students studying together in the library"
                className="aspect-video w-full object-cover sm:aspect-auto sm:h-[420px] lg:h-[520px]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy-950/50 via-transparent to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{
              opacity: 1,
              y: 0,
              boxShadow: [
                '0 20px 40px -12px rgba(255,157,31,0.25)',
                '0 20px 48px -8px rgba(255,157,31,0.5)',
                '0 20px 40px -12px rgba(255,157,31,0.25)',
              ],
            }}
            transition={{
              opacity: { duration: 0.7, delay: 0.7 },
              y: { duration: 0.7, delay: 0.7 },
              boxShadow: { duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 1.4 },
            }}
            className="absolute -bottom-8 -left-6 z-10 flex items-center gap-3 rounded-2xl border border-navy-100 bg-white px-5 py-4 sm:-left-10"
          >
            {/* <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-amber-400">
              <Sparkles size={20} className="text-navy-950" />
            </div> */}
            <div>
              <p className="font-display text-xl font-extrabold text-navy-950">
                Upto <CountUp to={85} suffix="%" loop pause={1.4} /> OFF
              </p>
              <p className="text-[12.5px] font-medium text-navy-500">for selected scholars</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="relative mt-16 border-t border-navy-100 pt-8 lg:mt-24"
      >
        <p className="mx-auto mb-4 max-w-7xl px-6 text-center text-[11px] font-bold tracking-widest text-navy-400 uppercase lg:px-10">
          Preparing students for
        </p>
        <Marquee items={examBadges} />
      </motion.div> */}
    </section>
  )
}
