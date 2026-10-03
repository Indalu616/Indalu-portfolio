import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import projects from '../../data/projects.json'
import SectionWrapper from '../../components/common/SectionWrapper'
import SectionTitle from '../../components/ui/SectionTitle'
import ProjectCard from '../../components/cards/ProjectCard'
import Modal from '../../components/modal/Modal'
import Tag from '../../components/ui/Tag'
import { GithubIcon } from '../../components/ui/BrandIcons'
import StaggerGroup from '../../components/animations/StaggerGroup'
import { fadeUp } from '../../lib/motionVariants'

export default function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <SectionWrapper id="projects" ariaLabel="Projects">
      <SectionTitle
        index="05"
        eyebrow="Projects"
        title="Selected"
        highlight="work"
        description="AI for accessibility, speech technology, and distributed systems. Projects built to solve real problems for real people."
      />

      <StaggerGroup className="mt-12 flex flex-wrap justify-center gap-4" stagger={0.08}>
        {projects.map((project, i) => (
          <motion.div key={project.id} variants={fadeUp} className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-4rem)/5)]">
            <ProjectCard project={project} index={i} onCaseStudy={setSelected} />
          </motion.div>
        ))}
      </StaggerGroup>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title}>
        {selected && (
          <div>
            <h3 className="pr-10 font-display text-2xl font-bold uppercase tracking-wide text-fg">{selected.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{selected.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {selected.technologies.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            <div className="mt-6 space-y-5 border-t border-border pt-6">
              <div>
                <p className="hud-label text-accent">Problem</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{selected.caseStudy.problem}</p>
              </div>
              <div>
                <p className="hud-label text-accent">Solution</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{selected.caseStudy.solution}</p>
              </div>
              <div>
                <p className="hud-label text-accent">Impact</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{selected.caseStudy.impact}</p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 border-t border-border pt-6">
              {selected.github && (
                <a href={selected.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 chamfer-sm border border-white/15 px-4 py-2 font-display text-xs font-semibold uppercase tracking-widest text-fg transition-colors hover:border-accent hover:text-accent">
                  <GithubIcon className="h-4 w-4" /> Source
                </a>
              )}
              {selected.liveDemo && (
                <a href={selected.liveDemo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 chamfer-sm bg-accent px-4 py-2 font-display text-xs font-semibold uppercase tracking-widest text-black transition-colors hover:bg-accent-2">
                  <ExternalLink className="h-4 w-4" /> Live Demo
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </SectionWrapper>
  )
}
