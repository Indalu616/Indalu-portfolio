import { useEffect, useState } from 'react'

/**
 * Tracks which section id is currently most visible in the viewport (scrollspy).
 */
export function useActiveSection(sectionIds = [], options = { rootMargin: '-40% 0px -55% 0px' }) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null)

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!elements.length) return undefined

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveId(entry.target.id)
      })
    }, options)

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds, options])

  return activeId
}
