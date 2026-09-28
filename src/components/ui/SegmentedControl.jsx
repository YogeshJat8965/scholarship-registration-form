import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function SegmentedControl({ label, options, value, onChange, required }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-semibold text-navy-800">
          {label} {required && <span className="text-amber-600">*</span>}
        </label>
      )}
      <div className="relative inline-flex rounded-xl border-2 border-navy-100 bg-white p-1">
        {options.map((option) => {
          const active = value === option
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={clsx(
                'relative z-10 flex-1 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors duration-200',
                active ? 'text-navy-950' : 'text-navy-500 hover:text-navy-800',
              )}
            >
              {active && (
                <motion.span
                  layoutId={`segment-${label}`}
                  className="absolute inset-0 -z-10 rounded-lg bg-amber-400"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}
