import { motion } from 'framer-motion'

export default function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  once = false,
  amount = 0.2,
  tilt = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, rotateX: tilt ? 10 : 0, scale: tilt ? 0.96 : 1 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
