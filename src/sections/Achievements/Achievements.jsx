import { motion } from 'framer-motion'
import { Trophy, GraduationCap, Rocket, Award, HeartHandshake } from 'lucide-react'
import achievements from '../../data/achievements.json'
import SectionWrapper from '../../components/common/SectionWrapper'
import SectionTitle from '../../components/ui/SectionTitle'
import Card from '../../components/cards/Card'
import Badge from '../../components/ui/Badge'
import StaggerGroup from '../../components/animations/StaggerGroup'
import { fadeUp } from '../../lib/motionVariants'

const TYPE_META = {
  scholarship: { icon: GraduationCap, label: 'Scholarship' },
  competition: { icon: Trophy, label: 'Competition' },
  hackathon: { icon: Rocket, label: 'Hackathon' },
  award: { icon: Award, label: 'Award' },
  volunteering: { icon: HeartHandshake, label: 'Volunteering' },
}

export default function Achievements() {
  return (
    <SectionWrapper id="achievements" ariaLabel="Achievements" className="bg-surface/30">
      <SectionTitle eyebrow="Achievements" title="Milestones along the way" description="Awards, competitions, and the community work I care about outside of day-to-day engineering." />

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {achievements.map((item) => {
          const meta = TYPE_META[item.type] ?? TYPE_META.award
          const Icon = meta.icon
          return (
            <motion.div key={item.id} variants={fadeUp}>
              <Card hover className="h-full p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <Badge variant="outline">{meta.label}</Badge>
                </div>
                <h3 className="mt-4 text-base font-semibold leading-snug text-fg">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">
                  {item.issuer}
                  {item.date && <> &middot; {item.date}</>}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
              </Card>
            </motion.div>
          )
        })}
      </StaggerGroup>
    </SectionWrapper>
  )
}
