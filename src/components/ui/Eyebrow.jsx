import clsx from 'clsx'

export default function Eyebrow({ children, dark = false, className }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[13px] font-semibold tracking-wide uppercase',
        dark
          ? 'border-cream-50/20 bg-cream-50/5 text-amber-300'
          : 'border-amber-200 bg-amber-50 text-amber-700',
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
      {children}
    </span>
  )
}
