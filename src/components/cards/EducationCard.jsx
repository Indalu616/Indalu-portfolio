import { GraduationCap, Award } from 'lucide-react'
import Card from './Card'
import Tag from '../ui/Tag'

export default function EducationCard({ education }) {
  const { institution, degree, field, duration, location, gpa, description, coursework, awards } = education
  return (
    <Card className="p-6 sm:p-7">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <GraduationCap className="h-6 w-6" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-fg">{institution}</h3>
          <p className="mt-0.5 font-medium text-accent">{degree}</p>
          <p className="text-sm text-muted">{field}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
            <span>{duration}</span>
            <span>{location}</span>
            {gpa && <span>GPA: {gpa}</span>}
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">{description}</p>

      {coursework?.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Relevant Coursework</p>
          <div className="flex flex-wrap gap-2">
            {coursework.map((c) => (
              <Tag key={c}>{c}</Tag>
            ))}
          </div>
        </div>
      )}

      {awards?.length > 0 && (
        <div className="mt-4 space-y-1.5 border-t border-border pt-4">
          {awards.map((a) => (
            <div key={a} className="flex items-start gap-2 text-sm text-muted">
              <Award className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              {a}
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
