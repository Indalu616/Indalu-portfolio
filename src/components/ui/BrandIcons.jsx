/**
 * lucide-react no longer ships trademarked brand/logo icons, so these lightweight
 * monoline SVGs fill the gap for GitHub, LinkedIn, X, and Dribbble. Sized like lucide
 * icons (24x24 viewBox, currentColor stroke/fill) so they drop in anywhere a lucide
 * icon is expected.
 */

export function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.2 1.78 1.2 1.03 1.78 2.71 1.26 3.37.97.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.08.78 2.18v3.24c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}

export function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  )
}

export function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.6 10.62 20.9 2h-1.73l-6.34 7.48L7.77 2H2l7.66 11.13L2 22h1.74l6.7-7.9 5.35 7.9H21.5l-7.9-11.38Zm-2.37 2.8-.78-1.11L4.3 3.3h2.66l4.99 7.14.78 1.11 6.49 9.29h-2.66l-5.33-7.42Z" />
    </svg>
  )
}

export function DribbbleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8.5 3.5c2.5 3 4.4 6.6 5.4 10.9M2.5 13.5c4-.6 8.4-.3 12.2 1M12.2 21.5c-1-3.7-2.9-8.6-5.9-12" strokeLinecap="round" />
    </svg>
  )
}
