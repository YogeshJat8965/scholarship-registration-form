import { Check } from 'lucide-react'
import clsx from 'clsx'

export default function RadioCards({ label, options, value, onChange, error, required }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-semibold text-navy-800">
          {label} {required && <span className="text-amber-600">*</span>}
        </label>
      )}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {options.map((option) => {
          const active = value === option
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={clsx(
                'relative flex items-center justify-center gap-1.5 rounded-xl border-2 px-3 py-3.5 text-[14.5px] font-semibold transition-all duration-200',
                active
                  ? 'border-amber-500 bg-amber-50 text-navy-950'
                  : 'border-navy-100 bg-white text-navy-500 hover:border-navy-300',
              )}
            >
              {option}
              {active && (
                <span className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-amber-500">
                  <Check size={12} strokeWidth={3} className="text-navy-950" />
                </span>
              )}
            </button>
          )
        })}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
