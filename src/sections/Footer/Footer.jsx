import { ArrowUp } from 'lucide-react'
import navigation from '../../data/navigation.json'
import social from '../../data/social.json'
import profile from '../../data/profile.json'
import Container from '../../components/ui/Container'
import SocialButton from '../../components/buttons/SocialButton'
import { scrollToId } from '../../utils/scrollTo'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] pt-16 pb-10">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-sm font-semibold tracking-[0.32em] text-fg">{navigation.brandShort}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{profile.tagline}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-4">
            {navigation.links.map((link, i) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId(link.id)
                }}
                className="group flex items-center gap-2 font-display text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent"
              >
                <span className="font-mono text-[10px] text-white/25 group-hover:text-accent/60">{String(i + 1).padStart(2, '0')}</span>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-3">
            {social.slice(0, 4).map((s) => (
              <SocialButton key={s.name} {...s} />
            ))}
          </div>
        </div>

        {/* Oversized wordmark */}
        <p
          className="pointer-events-none mt-16 select-none text-center font-display text-[18vw] font-bold uppercase leading-none tracking-tight text-transparent lg:text-[12rem]"
          style={{ WebkitTextStroke: '1px rgba(255,255,255,0.08)' }}
          aria-hidden="true"
        >
          {navigation.brandShort}
        </p>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:flex-row">
          <p>
            &copy; {year} {profile.name}
          </p>
          <button
            type="button"
            onClick={() => scrollToId('hero')}
            aria-label="Back to top"
            className="chamfer-sm inline-flex items-center gap-2 border border-white/15 px-3 py-1.5 transition-colors hover:border-accent hover:text-accent"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </Container>
    </footer>
  )
}
