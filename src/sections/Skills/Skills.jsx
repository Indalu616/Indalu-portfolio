import { motion } from 'framer-motion'
import { Wrench as FallbackIcon } from 'lucide-react'
import skills from '../../data/skills.json'
import SectionWrapper from '../../components/common/SectionWrapper'
import SectionTitle from '../../components/ui/SectionTitle'
import SkillBadge from '../../components/ui/SkillBadge'
import Card from '../../components/cards/Card'
import StaggerGroup from '../../components/animations/StaggerGroup'
import { fadeUp } from '../../lib/motionVariants'
import { SKILL_ICON_MAP } from '../../constants/icons'

export default function Skills() {
  return (
    <SectionWrapper id="skills" ariaLabel="Skills">
      <div className="hud-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" aria-hidden="true" />
      <SectionTitle
        index="02"
        eyebrow="Skills"
        title="A full-stack,"
        highlight="AI-native toolkit"
        description="Grouped by domain — from low-level systems to the frontier of applied machine learning."
      />

      <StaggerGroup className="relative mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {skills.map((group, i) => {
          const Icon = SKILL_ICON_MAP[group.icon] ?? FallbackIcon
          return (
            <motion.div key={group.category} variants={fadeUp}>
              <Card hover className="h-full p-6 sm:p-7">
                <div className="flex items-start justify-between">
                  <div className="chamfer-sm flex h-11 w-11 items-center justify-center border border-accent/40 bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[11px] tracking-widest text-white/30">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-5 font-display text-base font-semibold uppercase tracking-wider text-fg">{group.category}</h3>
                <div className="mt-6 space-y-4">
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
