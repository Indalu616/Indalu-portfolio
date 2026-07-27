import { motion } from 'framer-motion'
import skills from '../../data/skills.json'
import SectionWrapper from '../../components/common/SectionWrapper'
import SectionTitle from '../../components/ui/SectionTitle'
import SkillBadge from '../../components/ui/SkillBadge'
import Card from '../../components/cards/Card'
import StaggerGroup from '../../components/animations/StaggerGroup'
import { fadeUp } from '../../lib/motionVariants'
import { SKILL_ICON_MAP } from '../../constants/icons'
import { Wrench as FallbackIcon } from 'lucide-react'

export default function Skills() {
  return (
    <SectionWrapper id="skills" ariaLabel="Skills" className="bg-surface/30">
      <SectionTitle
        eyebrow="Skills"
        title="A full-stack, AI-native toolkit"
        description="Grouped by domain — from low-level systems to the frontier of applied machine learning."
      />

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {skills.map((group) => {
          const Icon = SKILL_ICON_MAP[group.icon] ?? FallbackIcon
          return (
            <motion.div key={group.category} variants={fadeUp}>
              <Card hover className="h-full p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold text-accent">{group.category}</h3>
                </div>
                <div className="mt-5 space-y-4">
                  {group.skills.map((skill) => (
                    <SkillBadge key={skill.name} {...skill} />
                  ))}
                </div>
              </Card>
            </motion.div>
          )
        })}
      </StaggerGroup>
    </SectionWrapper>
  )
}
