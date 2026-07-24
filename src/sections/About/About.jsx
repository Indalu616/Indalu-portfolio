import { Sparkles } from 'lucide-react'
import profile from '../../data/profile.json'
import SectionWrapper from '../../components/common/SectionWrapper'
import SectionTitle from '../../components/ui/SectionTitle'
import Tag from '../../components/ui/Tag'
import Counter from '../../components/ui/Counter'
import Reveal from '../../components/animations/Reveal'
import StaggerGroup from '../../components/animations/StaggerGroup'
import { fadeUp } from '../../lib/motionVariants'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <SectionWrapper id="about" ariaLabel="About me">
      <SectionTitle eyebrow="About Me" title="Student engineer, builder, and aspiring AI researcher" description={profile.summary} />

      <StaggerGroup className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4" stagger={0.08}>
        {profile.stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            className="rounded-2xl border border-border bg-surface/70 p-6 text-center backdrop-blur-sm"
          >
            <p className="text-3xl font-semibold text-fg sm:text-4xl">
              <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
            </p>
            <p className="mt-1.5 text-sm text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </StaggerGroup>

      <Reveal delay={0.1} className="mt-14 rounded-2xl border border-border bg-surface/50 p-7 sm:p-9">
        <div className="flex items-center gap-2 text-accent">
          <Sparkles className="h-4 w-4" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">What Drives Me</p>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">{profile.interestsBlurb}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {profile.interests.map((interest) => (
            <Tag key={interest}>{interest}</Tag>
          ))}
        </div>
      </Reveal>
    </SectionWrapper>
  )
}
