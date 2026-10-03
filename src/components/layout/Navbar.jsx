import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import navigation from '../../data/navigation.json'
import Container from '../ui/Container'
import Button from '../buttons/Button'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { scrollToId } from '../../utils/scrollTo'
import { cn } from '../../utils/cn'

const SECTION_IDS = navigation.links.map((l) => l.id)

/** Hexagon brand mark, echoing the HUD aesthetic. */
function BrandMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent" aria-hidden="true">
      <path d="M12 2 21 7v10l-9 5-9-5V7l9-5Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7.5 16 9.8v4.4L12 16.5 8 14.2V9.8l4-2.3Z" fill="currentColor" />
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const activeId = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    scrollToId(id)
    setOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'border-b border-white/[0.06] bg-black/70 backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <Container>
        <div className={cn('flex items-center justify-between transition-all duration-500', scrolled ? 'h-16' : 'h-20')}>
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={`${navigation.brand} — back to top`}
          >
            <BrandMark />
            <span className="font-display text-sm font-semibold tracking-[0.32em] text-fg">{navigation.brandShort}</span>
          </a>

          {isDesktop && (
            <nav className="flex items-center gap-1 xl:gap-2" aria-label="Primary">
              {navigation.links.map((link) => {
                const active = activeId === link.id
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    aria-current={active ? 'true' : undefined}
                    className={cn(
                      'relative px-2.5 py-2 font-display text-[11px] font-medium uppercase tracking-[0.16em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent xl:px-3',
                      active ? 'text-accent' : 'text-fg/75 hover:text-fg',
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -top-1 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[5px] border-t-[5px] border-x-transparent border-t-accent"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        aria-hidden="true"
                      />
                    )}
                    {link.label}
                  </a>
                )
              })}
            </nav>
          )}

          <div className="flex items-center gap-2">
            {isDesktop && (
              <Button href={navigation.cta.href} onClick={(e) => handleNavClick(e, 'contact')} size="sm" variant="accent">
                {navigation.cta.label}
              </Button>
            )}
            {!isDesktop && (
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                className="chamfer-sm inline-flex h-10 w-10 items-center justify-center border border-white/15 text-fg"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {!isDesktop && open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            aria-label="Mobile"
            className="hud-corners mx-4 mb-4 flex flex-col border border-white/10 bg-black/95 p-3 backdrop-blur-xl"
          >
            {navigation.links.map((link, i) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={cn(
                  'flex items-center gap-4 px-4 py-3 font-display text-xs uppercase tracking-[0.18em] transition-colors hover:text-accent',
                  activeId === link.id ? 'text-accent' : 'text-fg/80',
                )}
              >
                <span className="font-mono text-[10px] text-white/30">{String(i + 1).padStart(2, '0')}</span>
                {link.label}
              </a>
            ))}
            <Button href={navigation.resume.href} download="Indalu-Taresa-Resume.pdf" size="sm" className="mt-2">
              Download {navigation.resume.label}
            </Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
