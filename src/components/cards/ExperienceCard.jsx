import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MapPin } from 'lucide-react'
import Card from './Card'
import Tag from '../ui/Tag'
import Badge from '../ui/Badge'

/** Expandable experience card used inside the Experience vertical timeline. */
export default function ExperienceCard({ experience }) {
  const [open, setOpen] = useState(false)
  const { company, role, duration, location, type, summary, achievements, technologies, current } = experience

  return (
    <Card className="p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-accent">{role}</h3>
            {current && <Badge variant="success">Current</Badge>}
          </div>
          <p className="mt-1 font-medium text-accent">{company}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
            <span>{duration}</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {location}
            </span>
            <span>{type}</span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">{summary}</p>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
      >
        {open ? 'Hide details' : 'Show achievements & stack'}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <ul className="mt-4 space-y-2 border-t border-border pt-4">
              {achievements.map((a) => (
                <li key={a} className="flex gap-2 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {a}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {technologies.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
