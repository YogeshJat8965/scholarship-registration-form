import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'
import Button from './ui/Button'

export default function SuccessModal({ open, name, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-navy-950/70 p-6 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl bg-cream-50 p-8 text-center shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 grid h-8 w-8 place-items-center rounded-full text-navy-400 hover:bg-navy-50 hover:text-navy-700"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 18 }}
              className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-amber-100"
            >
              <CheckCircle2 size={40} className="text-amber-600" />
            </motion.div>

            <h3 className="mt-6 font-display text-2xl font-bold text-navy-950">
              Registration Successful!
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-navy-500">
              {name ? `Thank you, ${name}. ` : 'Thank you for applying. '}
              Your scholarship application has been received. Our team will reach out to you on
              WhatsApp shortly with the next steps.
            </p>

            <p className="mt-4 font-hindi text-lg text-amber-600">मेहनत आपकी, साथ हमारा।</p>

            <Button icon={false} onClick={onClose} className="mt-7 w-full justify-center">
              Done
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
