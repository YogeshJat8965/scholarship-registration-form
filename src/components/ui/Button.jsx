import { ArrowRight } from 'lucide-react'
import clsx from 'clsx'

const variants = {
  primary:
    'bg-amber-500 text-navy-950 hover:bg-amber-400 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30',
  outline:
    'bg-transparent text-cream-50 border-2 border-cream-50/30 hover:border-cream-50 hover:bg-cream-50/10',
  dark: 'bg-navy-950 text-cream-50 hover:bg-navy-800 shadow-lg shadow-navy-950/20',
}

export default function Button({
  children,
  variant = 'primary',
  icon = true,
  className,
  as = 'button',
  ...props
}) {
  const Comp = as
  return (
    <Comp
      className={clsx(
        'group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-semibold',
        'transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0',
        'cursor-pointer',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
      {icon && (
        <ArrowRight
          size={17}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </Comp>
  )
}
