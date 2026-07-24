import { useEffect, useState } from 'react'

/**
 * Cycles through an array of strings with a typewriter effect.
 */
export function useTypingEffect(words = [], { typingSpeed = 65, deletingSpeed = 35, pauseDuration = 1600 } = {}) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing') // typing | pausing | deleting

  useEffect(() => {
    if (!words.length) return undefined
    const currentWord = words[wordIndex % words.length]
    let timeout

    if (phase === 'typing') {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), typingSpeed)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pauseDuration)
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 200)
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(currentWord.slice(0, text.length - 1)), deletingSpeed)
      } else {
        // Advance to the next word on the following tick rather than setting state
        // synchronously in the effect body.
        timeout = setTimeout(() => {
          setWordIndex((i) => (i + 1) % words.length)
          setPhase('typing')
        }, 0)
      }
    }

    return () => clearTimeout(timeout)
  }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return text
}
