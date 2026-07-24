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
    <footer className="border-t border-border py-12">
      <Container>
        <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          <div>
            <p className="text-lg font-semibold text-fg">{navigation.brand}</p>
            <p className="mt-1 max-w-xs text-sm text-muted">{profile.tagline}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navigation.links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToId(link.id) }}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
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

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted sm:flex-row">
          <p>&copy; {year} {profile.name}. All rights reserved.</p>
          <button
            type="button"
            onClick={() => scrollToId('hero')}
            aria-label="Back to top"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 transition-colors hover:border-accent/50 hover:text-accent"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </Container>
    </footer>
  )
}
