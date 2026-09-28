import clsx from 'clsx'

export default function Input({ label, error, required, className, icon: Icon, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-semibold text-navy-800">
          {label} {required && <span className="text-amber-600">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-navy-300"
          />
        )}
        <input
          className={clsx(
            'w-full rounded-xl border-2 bg-white py-3.5 text-[15px] text-navy-900 placeholder:text-navy-300',
            Icon ? 'pl-11 pr-4' : 'px-4',
            'transition-all duration-200 focus:outline-none focus:ring-4',
            error
              ? 'border-red-400 focus:ring-red-100'
              : 'border-navy-100 hover:border-navy-300 focus:border-amber-500 focus:ring-amber-100',
            className,
          )}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
