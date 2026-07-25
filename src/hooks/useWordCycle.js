import { useEffect, useState } from 'react'

/** Cycles through an array of words/phrases at a fixed interval, looping forever. */
export function useWordCycle(words = [], intervalMs = 2600) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (words.length < 2) return undefined
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [words, intervalMs])

  return { index, word: words[index % words.length] ?? '' }
}
