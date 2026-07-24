const NAVBAR_OFFSET = 84

/** Smoothly scrolls to a section id, accounting for the fixed navbar height. */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET
  window.scrollTo({ top, behavior: 'smooth' })
}
