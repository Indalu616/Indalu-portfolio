import { memo } from 'react'
import { FileText, ExternalLink } from 'lucide-react'
import Card from './Card'

function ResearchCard({ paper }) {
  const { title, authors, venue, date, link } = paper
  return (
    <Card hover className="p-6">
      <FileText className="h-5 w-5 text-accent" aria-hidden="true" />
      <h3 className="mt-3 text-base font-semibold leading-snug text-accent">{title}</h3>
      <p className="mt-1.5 text-sm text-muted">{authors}</p>
      <p className="mt-1 text-xs text-muted">
        {venue} &middot; {date}
      </p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-fg"
        >
          Read paper <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </Card>
  )
}

export default memo(ResearchCard)
