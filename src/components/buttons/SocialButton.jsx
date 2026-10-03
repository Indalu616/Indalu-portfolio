import { SOCIAL_ICON_MAP } from '../../constants/icons'

/** Renders a social link with its mapped icon, given an entry from social.json. */
export default function SocialButton({ name, url, icon }) {
  const Icon = SOCIAL_ICON_MAP[icon] ?? SOCIAL_ICON_MAP.default
  const external = url?.startsWith('http')
  return (
    <a
      href={url}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={name}
      className="chamfer-sm inline-flex h-10 w-10 items-center justify-center border border-white/15 bg-white/[0.02] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </a>
  )
}
