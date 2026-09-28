import { useEffect, useState } from 'react'

export default function Typewriter({
  text,
  className,
  typingSpeed = 90,
  erasingSpeed = 45,
  pauseFull = 1800,
  pauseEmpty = 500,
}) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    let i = 0
    let phase = 'typing'
    let timeoutId

    function tick() {
      if (phase === 'typing') {
        i++
        setDisplay(text.slice(0, i))
        timeoutId = setTimeout(tick, i >= text.length ? pauseFull : typingSpeed)
        if (i >= text.length) phase = 'erasing'
      } else {
        i--
        setDisplay(text.slice(0, i))
        timeoutId = setTimeout(tick, i <= 0 ? pauseEmpty : erasingSpeed)
        if (i <= 0) phase = 'typing'
      }
    }

    timeoutId = setTimeout(tick, typingSpeed)
    return () => clearTimeout(timeoutId)
  }, [text, typingSpeed, erasingSpeed, pauseFull, pauseEmpty])

  return <span className={className}>{display || ' '}</span>
}
