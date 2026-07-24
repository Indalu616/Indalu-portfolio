import { motion } from 'framer-motion'
import certifications from '../../data/certifications.json'
import SectionWrapper from '../../components/common/SectionWrapper'
import SectionTitle from '../../components/ui/SectionTitle'
import CertificationCard from '../../components/cards/CertificationCard'
import StaggerGroup from '../../components/animations/StaggerGroup'
import { fadeUp } from '../../lib/motionVariants'

export default function Certifications() {
  // No certifications in the data yet — hide the section rather than show an empty grid.
  if (!certifications.length) return null

  return (
    <SectionWrapper id="certifications" ariaLabel="Certifications">
      <SectionTitle eyebrow="Certifications" title="Verified expertise" description="Industry-recognized credentials across cloud, ML, and delivery practices." />

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {certifications.map((cert) => (
          <motion.div key={cert.id} variants={fadeUp}>
            <CertificationCard certification={cert} />
          </motion.div>
        ))}
      </StaggerGroup>
    </SectionWrapper>
  )
}
