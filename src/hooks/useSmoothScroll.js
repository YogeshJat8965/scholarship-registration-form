import { useEffect } from 'react'
import Lenis from 'lenis'

export default function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      anchors: true,
      autoRaf: true,
    })

    return () => lenis.destroy()
  }, [])
}
