import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import clsx from 'clsx'

export default function Stepper({ steps, current }) {
  return (
    <div className="mb-10">
      <div className="flex items-center">
        {steps.map((step, i) => {
          const { label, icon: Icon } = step
          const isDone = i < current
          const isActive = i === current
          return (
            <div key={label} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  animate={isActive ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className={clsx(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors duration-300',
                    isDone && 'border-amber-500 bg-amber-500 text-navy-950 shadow-sm shadow-amber-500/30',
                    isActive && 'border-amber-500 bg-white text-amber-600 ring-4 ring-amber-100',
                    !isDone && !isActive && 'border-navy-200 bg-white text-navy-300',
                  )}
                >
                  {isDone ? (
                    <Check size={17} strokeWidth={3} />
                  ) : (
                    <Icon size={16} strokeWidth={2.4} />
                  )}
                </motion.div>
                <span
                  className={clsx(
                    'hidden text-[11px] font-semibold tracking-wide whitespace-nowrap sm:block',
                    isActive ? 'text-navy-900' : 'text-navy-400',
                  )}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="mx-1.5 h-0.5 flex-1 overflow-hidden rounded-full bg-navy-100 sm:mx-3">
                  <motion.div
                    initial={false}
                    animate={{ width: isDone ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="h-full rounded-full bg-amber-500"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
