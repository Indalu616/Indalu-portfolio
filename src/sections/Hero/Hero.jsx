import { motion } from 'framer-motion'
import { ArrowRight, Download, ChevronDown, MapPin } from 'lucide-react'
import profile from '../../data/profile.json'
import social from '../../data/social.json'
import Container from '../../components/ui/Container'
import Button from '../../components/buttons/Button'
import SocialButton from '../../components/buttons/SocialButton'
import HalftonePortrait from '../../components/animations/HalftonePortrait'
import { useTypingEffect } from '../../hooks/useTypingEffect'
import { scrollToId } from '../../utils/scrollTo'
import { resolveImage } from '../../utils/resolveAsset'
import { staggerContainer, fadeUp, fadeIn } from '../../lib/motionVariants'

const HUD_READOUTS = [
  { k: 'GPA', v: '3.96 / 4.00' },
  { k: 'LOC', v: 'ABU DHABI · UAE' },
  { k: 'FOCUS', v: 'AI · ACCESSIBILITY' },
]

export default function Hero() {
  const typed = useTypingEffect(profile.titles)
  const portrait = resolveImage(profile.heroPortrait ?? profile.photoUrl)

  return (
    <section id="hero" aria-label="Introduction" className="relative overflow-hidden pt-24 pb-16 sm:pt-28 lg:pb-24">
      {/* Floor glow beneath the frame */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] accent-haze opacity-70" aria-hidden="true" />

      <Container>
        <div className="hud-frame relative min-h-[calc(100svh-9rem)] px-6 py-12 sm:px-10 lg:px-16 lg:py-0">
          {/* interior grid + glow */}
          <div className="pointer-events-none absolute inset-[1px] -z-0 overflow-hidden" aria-hidden="true">
            <div className="hud-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_80%_70%_at_60%_40%,black,transparent)]" />
            <div className="absolute -bottom-1/3 right-0 h-2/3 w-2/3 rounded-full bg-accent/20 blur-[120px]" />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.12, 0.1)}
            className="relative grid h-full min-h-[inherit] grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]"
          >
            {/* ── Copy ── */}
            <div className="relative z-10 lg:py-24">
              <motion.div
                variants={fadeUp}
                className="chamfer-sm mb-7 inline-flex items-center gap-2 border border-accent/50 bg-accent/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent"
              >
                <span className="text-white/40">&gt;</span>
                {/* Reserve width for the longest title so the chip never jumps */}
                <span className="grid">
                  {profile.titles.map((t) => (
                    <span key={t} aria-hidden="true" className="invisible col-start-1 row-start-1">
                      {t}_
                    </span>
                  ))}
                  <span className="col-start-1 row-start-1">
                    {typed}
                    <span className="animate-blink">_</span>
                  </span>
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display text-[2.6rem] font-bold uppercase leading-[0.98] tracking-wide text-fg sm:text-6xl lg:text-[4.6rem] xl:text-[5.2rem]"
              >
                <span className="sr-only">{profile.name}: </span>
                Engineering
                <br />
                Beyond the
                <br />
                <span className="text-accent text-glow">Code</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                I&apos;m <span className="text-fg">{profile.name}</span>. {profile.tagline}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
                <Button icon={ArrowRight} magnetic onClick={() => scrollToId('projects')}>
                  View Projects
                </Button>
                <Button variant="outline" href={profile.resumeUrl} download="Indalu-Taresa-Resume.pdf" icon={Download}>
                  Download CV
                </Button>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-9 flex items-center gap-3">
                {social.map((s) => (
                  <SocialButton key={s.name} {...s} />
                ))}
                <span className="ml-2 hidden items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted sm:inline-flex">
                  <MapPin className="h-3.5 w-3.5 text-accent" /> {profile.location}
                </span>
              </motion.div>
            </div>

            {/* ── Portrait ── */}
            <motion.div variants={fadeIn} className="relative h-[440px] sm:h-[560px] lg:h-auto lg:self-stretch">
              <HalftonePortrait
                src={portrait}
                alt={`Portrait of ${profile.name}`}
                className="!absolute inset-x-0 bottom-0 top-0 overflow-hidden lg:top-16"
                fallback={
                  <div className="flex h-full items-center justify-center font-display text-8xl font-bold text-accent/30">{profile.initials}</div>
                }
              />

              {/* HUD readouts */}
              <div className="pointer-events-none absolute bottom-10 left-0 hidden flex-col items-start gap-2 sm:flex lg:bottom-28">
                {HUD_READOUTS.map((r, i) => (
                  <motion.div
                    key={r.k}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
                    className="chamfer-sm flex items-center gap-3 border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur"
                  >
                    <span className="text-accent">{r.k}</span>
                    <span className="text-fg/80">{r.v}</span>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          </motion.div>

          {/* ── Status bar ── */}
          <div className="relative z-10 mt-4 flex items-center gap-4 pb-8 lg:absolute lg:inset-x-16 lg:bottom-6 lg:mt-0 lg:pb-0">
            <span className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] sm:text-[11px]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <span className="text-success">Status:</span>
              <span className="text-fg/80">Available for hire</span>
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-white/25 via-white/10 to-accent/40" aria-hidden="true" />
            <button
              type="button"
              onClick={() => scrollToId('about')}
              className="hidden shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent/80 transition-colors hover:text-accent sm:inline-flex"
            >
              Scroll to explore <ChevronDown className="h-4 w-4 animate-bounce" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
