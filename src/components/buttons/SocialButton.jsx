import { SOCIAL_ICON_MAP } from '../../constants/icons'

/** Renders a social link with its mapped lucide icon, given an entry from social.json. */
export default function SocialButton({ name, url, icon }) {
  const Icon = SOCIAL_ICON_MAP[icon] ?? SOCIAL_ICON_MAP.default
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </a>
  )
}
