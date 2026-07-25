import { useEffect, useState } from 'react'

/**
 * Types out an array of code lines one character at a time, line by line.
 * Returns the lines completed so far plus the in-progress line, so callers
 * can render a terminal-style block that grows as it "compiles".
 */
export function useCodeTyping(lines = [], { active = true, charSpeed = 14, lineSpeed = 90, startDelay = 300 } = {}) {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!active) return undefined
    const t = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(t)
  }, [active, startDelay])

  useEffect(() => {
    if (!active || !started || !lines.length) return undefined
    if (lineIndex >= lines.length) return undefined

    const currentLine = lines[lineIndex]
    let timeout

    if (charIndex < currentLine.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), charSpeed)
    } else {
      timeout = setTimeout(() => {
        setLineIndex((l) => l + 1)
        setCharIndex(0)
      }, lineSpeed)
    }

    return () => clearTimeout(timeout)
  }, [active, started, lineIndex, charIndex, lines, charSpeed, lineSpeed])

  const completedLines = lines.slice(0, lineIndex)
  const currentLine = lineIndex < lines.length ? lines[lineIndex].slice(0, charIndex) : ''
  const isDone = lineIndex >= lines.length

  return { completedLines, currentLine, isDone }
}
