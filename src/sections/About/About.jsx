import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import profile from '../../data/profile.json'
import SectionWrapper from '../../components/common/SectionWrapper'
import SectionTitle from '../../components/ui/SectionTitle'
import Tag from '../../components/ui/Tag'
import Counter from '../../components/ui/Counter'
import Reveal from '../../components/animations/Reveal'
import StaggerGroup from '../../components/animations/StaggerGroup'
import { fadeUp } from '../../lib/motionVariants'

export default function About() {
  return (
    <SectionWrapper id="about" ariaLabel="About me">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <SectionTitle index="01" eyebrow="About" title="Student engineer," highlight="builder & researcher" description={profile.summary} />

          <Reveal delay={0.1} className="mt-10 border-l-2 border-accent/60 pl-6">
            <div className="flex items-center gap-2 text-accent">
              <Sparkles className="h-4 w-4" />
              <p className="hud-label">What drives me</p>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{profile.interestsBlurb}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <Tag key={interest}>{interest}</Tag>
              ))}
            </div>
          </Reveal>
        </div>

        <StaggerGroup className="grid grid-cols-2 content-start gap-px self-center border border-white/[0.07] bg-white/[0.07]" stagger={0.08}>
          {profile.stats.map((stat, i) => (
            <motion.div key={stat.label} variants={fadeUp} className="group relative bg-bg p-6 transition-colors hover:bg-white/[0.02] sm:p-8">
              <span className="font-mono text-[10px] tracking-widest text-white/30">{String(i + 1).padStart(2, '0')}</span>
              <p className="mt-4 font-display text-3xl font-bold text-fg sm:text-4xl">
                <Counter value={stat.value} suffix="" decimals={stat.decimals ?? 0} />
                <span className="text-accent">{stat.suffix}</span>
              </p>
              <p className="mt-2 text-xs uppercase tracking-wider text-muted">{stat.label}</p>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" aria-hidden="true" />
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </SectionWrapper>
  )
}
