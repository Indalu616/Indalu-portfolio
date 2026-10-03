import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { MousePointerClick, Pause } from 'lucide-react'
import certifications from '../../data/certifications.json'
import SectionWrapper from '../../components/common/SectionWrapper'
import SectionTitle from '../../components/ui/SectionTitle'
import CertificationCard from '../../components/cards/CertificationCard'
import CertificateLightbox from '../../components/modal/CertificateLightbox'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { fadeUp, viewportOnce } from '../../lib/motionVariants'

/** Seconds per card for the marquee — lower is faster. */
const SECONDS_PER_CARD = 7

export default function Certifications() {
  const [openIndex, setOpenIndex] = useState(null)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const total = certifications.length

  const openCert = useCallback((cert) => {
    setOpenIndex(certifications.findIndex((c) => c.id === cert.id))
  }, [])
  const close = useCallback(() => setOpenIndex(null), [])

  if (!total) return null

  return (
    <SectionWrapper id="certificates" ariaLabel="Certificates and recognition" containerClassName="!max-w-none !px-0">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 2xl:max-w-[1600px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            index="06"
            eyebrow="Certificates"
            title="Credentials &"
            highlight="Recognition"
            description="Awards, professional experience letters, and course credentials collected along the way."
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="flex shrink-0 items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
          >
            <span>
              <span className="font-display text-3xl font-bold text-accent">{String(total).padStart(2, '0')}</span> credentials
            </span>
            <span className="hidden h-8 w-px bg-white/10 sm:block" aria-hidden="true" />
            <span className="hidden flex-col gap-1.5 sm:flex">
              <span className="inline-flex items-center gap-2"><Pause className="h-3.5 w-3.5 text-accent" /> Hover to pause</span>
              <span className="inline-flex items-center gap-2"><MousePointerClick className="h-3.5 w-3.5 text-accent" /> Click to view</span>
            </span>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-14"
      >
        {reducedMotion ? (
          // Reduced motion: a plain, swipeable row instead of an auto-scrolling marquee.
          <div className="flex snap-x gap-6 overflow-x-auto px-6 pb-6 pt-2 sm:px-8 lg:px-12">
            {certifications.map((cert, i) => (
              <CertificationCard key={cert.id} certification={cert} index={i} total={total} onOpen={openCert} className="snap-start" />
            ))}
          </div>
        ) : (
          <div className="pause-on-hover fade-x overflow-hidden py-4" role="region" aria-label="Certificates carousel — hover to pause, click a certificate to view it">
            <div
              className="flex w-max animate-marquee gap-6 pr-6"
              style={{ '--marquee-duration': `${total * SECONDS_PER_CARD}s` }}
            >
              {[0, 1].map((copy) =>
                certifications.map((cert, i) => (
                  <div key={`${copy}-${cert.id}`} aria-hidden={copy === 1 ? 'true' : undefined} className="flex">
                    <CertificationCard certification={cert} index={i} total={total} onOpen={openCert} inert={copy === 1} />
                  </div>
                )),
              )}
            </div>
          </div>
        )}
      </motion.div>

      <CertificateLightbox items={certifications} index={openIndex} onClose={close} onNavigate={setOpenIndex} />
    </SectionWrapper>
  )
}
