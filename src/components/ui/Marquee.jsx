import { motion } from 'framer-motion'

export default function Marquee({ items, duration = 24, className }) {
  const track = [...items, ...items]

  return (
    <div className={`overflow-hidden ${className ?? ''}`}>
      <motion.div
        className="flex w-max items-center"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            className="mx-3 inline-flex shrink-0 items-center gap-2 rounded-full border border-navy-100 bg-white px-5 py-2 text-[13px] font-semibold whitespace-nowrap text-navy-600 shadow-sm shadow-navy-900/5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
