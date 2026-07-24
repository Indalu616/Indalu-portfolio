import { memo } from 'react'
import { Quote, Star } from 'lucide-react'
import Card from './Card'

function TestimonialCard({ testimonial }) {
  const { name, role, company, quote, rating } = testimonial
  return (
    <Card className="mx-auto flex h-full max-w-2xl flex-col p-8 sm:p-10">
      <Quote className="h-8 w-8 text-accent/40" aria-hidden="true" />
      <p className="mt-4 flex-1 text-balance text-lg leading-relaxed text-fg sm:text-xl">&ldquo;{quote}&rdquo;</p>
      <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
            {name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <p className="font-medium text-fg">{name}</p>
            <p className="text-sm text-muted">
              {role} &middot; {company}
            </p>
          </div>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-accent text-accent" />
          ))}
        </div>
      </div>
    </Card>
  )
}

export default memo(TestimonialCard)
