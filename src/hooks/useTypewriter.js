import { useState, useEffect, useCallback } from 'react'

export function useTypewriter(texts, { typingSpeed = 50, deletingSpeed = 30, pauseDuration = 2000 } = {}) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const tick = useCallback(() => {
    const currentText = texts[textIndex]

    if (isPaused) return

    if (!isDeleting) {
      if (charIndex < currentText.length) {
        setDisplayText(currentText.slice(0, charIndex + 1))
        setCharIndex((prev) => prev + 1)
      } else {
        setIsPaused(true)
        setTimeout(() => {
          setIsPaused(false)
          setIsDeleting(true)
        }, pauseDuration)
      }
    } else {
      if (charIndex > 0) {
        setDisplayText(currentText.slice(0, charIndex - 1))
        setCharIndex((prev) => prev - 1)
      } else {
        setIsDeleting(false)
        setTextIndex((prev) => (prev + 1) % texts.length)
      }
    }
  }, [texts, textIndex, charIndex, isDeleting, isPaused, pauseDuration])

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed
    const timeout = setTimeout(tick, speed)
    return () => clearTimeout(timeout)
  }, [tick, isDeleting, typingSpeed, deletingSpeed])

  return displayText
}
