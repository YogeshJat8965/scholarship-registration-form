import { Check } from 'lucide-react'
import clsx from 'clsx'

export default function Checkbox({ checked, onChange, children, error }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex cursor-pointer items-start gap-3 select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <span
          className={clsx(
            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200',
            checked
              ? 'border-amber-500 bg-amber-500'
              : 'border-navy-200 bg-white hover:border-navy-400',
          )}
        >
          {checked && <Check size={13} strokeWidth={3} className="text-navy-950" />}
        </span>
        <span className="text-[14.5px] leading-relaxed text-navy-700">{children}</span>
      </label>
      {error && <p className="pl-8 text-sm text-red-500">{error}</p>}
    </div>
  )
}
