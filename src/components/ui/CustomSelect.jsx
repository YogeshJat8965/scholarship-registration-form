import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, Search } from 'lucide-react'
import clsx from 'clsx'

function isGrouped(options) {
  return options.length > 0 && typeof options[0] === 'object' && 'options' in options[0]
}

export default function CustomSelect({
  label,
  placeholder = 'Select an option',
  options,
  value,
  onChange,
  error,
  searchable = false,
  required = false,
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef(null)
  const inputRef = useRef(null)
  const listboxId = useId()

  const grouped = isGrouped(options)

  useEffect(() => {
    function onClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false)
        setQuery('')
      }
    }
    function onEscape(e) {
      if (e.key === 'Escape') {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  useEffect(() => {
    if (open && searchable) {
      const t = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    }
  }, [open, searchable])

  const filteredOptions = useMemo(() => {
    if (!query) return options
    const q = query.toLowerCase()
    if (grouped) {
      return options
        .map((group) => ({
          ...group,
          options: group.options.filter((o) => o.toLowerCase().includes(q)),
        }))
        .filter((group) => group.options.length > 0)
    }
    return options.filter((o) => o.toLowerCase().includes(q))
  }, [options, query, grouped])

  function handleSelect(option) {
    onChange(option)
    setOpen(false)
    setQuery('')
  }

  const hasOtherOption = grouped
    ? options.some((group) => group.options.includes('Other'))
    : options.includes('Other')

  return (
    <div className="flex flex-col gap-2" ref={rootRef}>
      {label && (
        <label className="text-sm font-semibold text-navy-800">
          {label} {required && <span className="text-amber-600">*</span>}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          onClick={() => setOpen((o) => !o)}
          className={clsx(
            'flex w-full items-center justify-between rounded-xl border-2 bg-white px-4 py-3.5 text-left text-[15px] transition-all duration-200',
            'focus:outline-none focus:ring-4',
            error
              ? 'border-red-400 focus:ring-red-100'
              : open
                ? 'border-amber-500 ring-4 ring-amber-100'
                : 'border-navy-100 hover:border-navy-300 focus:ring-amber-100',
          )}
        >
          <span className={clsx(value ? 'text-navy-900' : 'text-navy-400')}>
            {value || placeholder}
          </span>
          <ChevronDown
            size={18}
            className={clsx(
              'shrink-0 text-navy-500 transition-transform duration-300',
              open && 'rotate-180 text-amber-600',
            )}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              id={listboxId}
              role="listbox"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-navy-100 bg-white shadow-xl shadow-navy-900/10"
            >
              {searchable && (
                <div className="flex items-center gap-2 border-b border-navy-100 px-3.5 py-2.5">
                  <Search size={16} className="text-navy-400" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-transparent text-sm text-navy-900 outline-none placeholder:text-navy-300"
                  />
                </div>
              )}
              <div className="max-h-64 overflow-y-auto py-1.5">
                {grouped
                  ? filteredOptions.map((group) => (
                      <div key={group.label}>
                        <p className="px-4 pt-2.5 pb-1 text-[11px] font-bold uppercase tracking-wider text-amber-600">
                          {group.label}
                        </p>
                        {group.options.map((option) => (
                          <Option
                            key={option}
                            option={option}
                            selected={option === value}
                            onSelect={handleSelect}
                          />
                        ))}
                      </div>
                    ))
                  : filteredOptions.map((option) => (
                      <Option
                        key={option}
                        option={option}
                        selected={option === value}
                        onSelect={handleSelect}
                      />
                    ))}
                {filteredOptions.length === 0 && (
                  <div className="px-4 py-3">
                    <p className="text-sm text-navy-400">
                      No matches found{query ? ` for "${query}"` : ''}
                    </p>
                    {hasOtherOption && query && (
                      <button
                        type="button"
                        onClick={() => handleSelect('Other')}
                        className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 transition-colors hover:text-amber-700"
                      >
                        Can't find it? Select "Other"
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

function Option({ option, selected, onSelect }) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      onClick={() => onSelect(option)}
      className={clsx(
        'flex w-full items-center justify-between px-4 py-2.5 text-left text-[15px] transition-colors',
        selected ? 'bg-amber-50 text-navy-900 font-semibold' : 'text-navy-700 hover:bg-cream-100',
      )}
    >
      {option}
      {selected && <Check size={16} className="text-amber-600" />}
    </button>
  )
}
