import { motion } from 'framer-motion'
import { FlaskConical, Mic } from 'lucide-react'
import research from '../../data/research.json'
import SectionWrapper from '../../components/common/SectionWrapper'
import SectionTitle from '../../components/ui/SectionTitle'
import ResearchCard from '../../components/cards/ResearchCard'
import Tag from '../../components/ui/Tag'
import Card from '../../components/cards/Card'
import StaggerGroup from '../../components/animations/StaggerGroup'
import { fadeUp } from '../../lib/motionVariants'

export default function Research() {
  return (
    <SectionWrapper id="research" ariaLabel="Research">
      <SectionTitle index="07" eyebrow="Research" title="Curiosity," highlight="formalized" description="Ongoing exploration at the intersection of AI, accessibility, and learning." />

      <div className="mt-10 flex flex-wrap gap-2">
        {research.interests.map((interest) => (
          <Tag key={interest}>{interest}</Tag>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {research.ongoing.map((item) => (
          <Card key={item.title} hover className="p-6 sm:p-7">
            <div className="flex items-center gap-2 text-accent">
              <FlaskConical className="h-4 w-4" />
              <span className="hud-label">{item.status}</span>
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold uppercase tracking-wide text-fg">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>
          </Card>
        ))}
      </div>

      {research.papers.length > 0 && (
        <>
          <h3 className="hud-label mt-16 text-accent">Publications</h3>
          <StaggerGroup className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {research.papers.map((paper) => (
              <motion.div key={paper.title} variants={fadeUp}>
                <ResearchCard paper={paper} />
              </motion.div>
            ))}
          </StaggerGroup>
        </>
      )}

      {research.conferences.length > 0 && (
        <>
          <h3 className="hud-label mt-16 text-accent">Conferences</h3>
          <div className="mt-6 hud-corners divide-y divide-white/[0.07] border border-white/[0.07]">
            {research.conferences.map((conf) => (
              <div key={`${conf.name}-${conf.date}`} className="flex flex-col gap-1 bg-white/[0.015] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Mic className="h-4 w-4 text-accent" />
                  <span className="font-medium text-fg">{conf.name}</span>
                  <span className="text-sm text-muted">· {conf.role}</span>
                </div>
                <span className="text-sm text-muted">{conf.location} &middot; {conf.date}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </SectionWrapper>
  )
}
