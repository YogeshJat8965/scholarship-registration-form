import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'
import Button from './ui/Button'

const links = [
  { label: 'Programmes', href: '#programmes' },
  { label: 'Scholarship', href: '#scholarship' },
  { label: 'Apply', href: '#apply' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300',
        scrolled && 'shadow-sm shadow-navy-900/5',
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="flex items-center gap-3">
          <img src="/SKillzza-Logo-123-01.png" alt="Skillzza" className="h-11 w-auto" />
          <span className="hidden text-[11px] font-semibold tracking-widest text-amber-600 uppercase sm:block">
            × Earth Care Foundation
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-navy-700 transition-colors hover:text-amber-600"
            >
              {link.label}
            </a>
          ))}
          <Button as="a" href="#apply" icon={false} className="px-6 py-2.5 text-sm">
            Apply Now
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="grid h-10 w-10 place-items-center rounded-full text-navy-900 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-cream-50 shadow-lg md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-navy-800 hover:bg-navy-50"
                >
                  {link.label}
                </a>
              ))}
              <Button
                as="a"
                href="#apply"
                onClick={() => setMenuOpen(false)}
                className="mt-2 justify-center"
              >
                Apply Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
