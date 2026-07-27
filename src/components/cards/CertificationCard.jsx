import { memo } from 'react'
import { BadgeCheck, ExternalLink } from 'lucide-react'
import Card from './Card'
import { formatMonthYear } from '../../utils/formatDate'

function CertificationCard({ certification }) {
  const { title, issuer, issueDate, expiryDate, credentialId, verifyUrl } = certification
  return (
    <Card hover className="flex flex-col p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
        <BadgeCheck className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-base font-semibold leading-snug text-accent">{title}</h3>
      <p className="mt-1 text-sm text-muted">{issuer}</p>
      <div className="mt-3 space-y-1 text-xs text-muted">
        <p>Issued {formatMonthYear(issueDate)}</p>
        {expiryDate && <p>Expires {formatMonthYear(expiryDate)}</p>}
        <p className="truncate">ID: {credentialId}</p>
      </div>
      <a
        href={verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-fg"
      >
        Verify credential <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </Card>
  )
}

export default memo(CertificationCard)
