import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import testimonials from '../../data/testimonials.json'
import SectionWrapper from '../../components/common/SectionWrapper'
import SectionTitle from '../../components/ui/SectionTitle'
import TestimonialCard from '../../components/cards/TestimonialCard'
import { cn } from '../../utils/cn'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const hasTestimonials = testimonials.length > 0

  const go = useCallback(
    (dir) => {
      if (!testimonials.length) return
      setDirection(dir)
      setIndex((i) => (i + dir + testimonials.length) % testimonials.length)
    },
    [],
  )

  useEffect(() => {
    if (testimonials.length < 2) return undefined
    const timer = setInterval(() => go(1), 7000)
    return () => clearInterval(timer)
  }, [go])

  // No testimonials in the data yet — hide the section rather than show an empty carousel.
  if (!hasTestimonials) return null

  return (
    <SectionWrapper id="testimonials" ariaLabel="Testimonials">
      <SectionTitle align="center" eyebrow="Testimonials" title="What colleagues say" className="mx-auto" />

      <div className="relative mt-14">
        <div className="relative min-h-[280px] overflow-hidden sm:min-h-[240px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={testimonials[index].id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <TestimonialCard testimonial={testimonials[index]} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/50 hover:text-accent"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => {
                  setDirection(i > index ? 1 : -1)
                  setIndex(i)
                }}
                className={cn('h-1.5 rounded-full transition-all duration-300', i === index ? 'w-6 bg-accent' : 'w-1.5 bg-border')}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/50 hover:text-accent"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </SectionWrapper>
  )
}
