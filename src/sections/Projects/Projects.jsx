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
    <SectionWrapper id="projects" ariaLabel="Projects" className="bg-surface/30">
      <SectionTitle
        eyebrow="Projects"
        title="Selected work"
        description="A mix of open-source infrastructure, production systems, and side projects I couldn't leave alone."
      />

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {projects.map((project) => (
          <motion.div key={project.id} variants={fadeUp}>
            <ProjectCard project={project} onCaseStudy={setSelected} />
          </motion.div>
        ))}
      </StaggerGroup>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title}>
        {selected && (
          <div>
            <h3 className="pr-10 text-2xl font-semibold text-accent">{selected.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{selected.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {selected.technologies.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            <div className="mt-6 space-y-5 border-t border-border pt-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">Problem</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{selected.caseStudy.problem}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">Solution</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{selected.caseStudy.solution}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">Impact</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{selected.caseStudy.impact}</p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 border-t border-border pt-6">
              {selected.github && (
                <a href={selected.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-accent/50 hover:text-accent">
                  <GithubIcon className="h-4 w-4" /> Source
                </a>
              )}
              {selected.liveDemo && (
                <a href={selected.liveDemo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90">
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
