import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import navigation from '../../data/navigation.json'
import Container from '../ui/Container'
import Button from '../buttons/Button'
import ThemeToggle from '../buttons/ThemeToggle'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { scrollToId } from '../../utils/scrollTo'
import { cn } from '../../utils/cn'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const activeId = useActiveSection(navigation.links.map((l) => l.id))

  const handleNavClick = (e, id) => {
    e.preventDefault()
    scrollToId(id)
    setOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-3 mt-3 sm:mx-6 sm:mt-4">
        <Container className="!px-0">
          <div className="flex items-center justify-between rounded-2xl border border-border bg-surface/70 px-4 py-3 shadow-sm backdrop-blur-xl sm:px-6">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, 'hero')}
              className="text-sm font-semibold tracking-tight text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              {navigation.brand}
            </a>

            {isDesktop && (
              <nav className="flex items-center gap-1" aria-label="Primary">
                {navigation.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={cn(
                      'relative rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                      activeId === link.id && 'text-fg',
                    )}
                  >
                    {activeId === link.id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-accent/10"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                ))}
              </nav>
            )}

            <div className="flex items-center gap-2">
              {isDesktop && (
                <Button href={navigation.cta.href} download="Indalu-Taresa-Resume.pdf" size="sm" variant="primary" magnetic>
                  {navigation.cta.label}
                </Button>
              )}
              <ThemeToggle />
              {!isDesktop && (
                <button
                  type="button"
                  onClick={() => setOpen((o) => !o)}
                  aria-label={open ? 'Close menu' : 'Open menu'}
                  aria-expanded={open}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-fg"
                >
                  {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
              )}
            </div>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {!isDesktop && open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            aria-label="Mobile"
            className="mx-3 mt-2 flex flex-col gap-1 rounded-2xl border border-border bg-surface/95 p-3 shadow-lg backdrop-blur-xl sm:mx-6"
          >
            {navigation.links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={cn(
                  'rounded-xl px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-accent/10 hover:text-fg',
                  activeId === link.id && 'bg-accent/10 text-fg',
                )}
              >
                {link.label}
              </a>
            ))}
            <Button href={navigation.cta.href} download="Indalu-Taresa-Resume.pdf" size="sm" className="mt-1 justify-center">
              {navigation.cta.label}
            </Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
