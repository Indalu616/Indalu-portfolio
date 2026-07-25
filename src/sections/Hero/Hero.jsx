import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowRight, MapPin, Headphones } from 'lucide-react'
import profile from '../../data/profile.json'
import social from '../../data/social.json'
import Container from '../../components/ui/Container'
import Button from '../../components/buttons/Button'
import SocialButton from '../../components/buttons/SocialButton'
import FloatingShapes from '../../components/animations/FloatingShapes'
import AudioWave from '../../components/animations/AudioWave'
import BubblingTerms from '../../components/animations/BubblingTerms'
import GlowWords from '../../components/animations/GlowWords'
import dataStructureTerms from '../../data/dataStructureTerms.json'
import { useTypingEffect } from '../../hooks/useTypingEffect'
import { scrollToId } from '../../utils/scrollTo'
import { resolveImage } from '../../utils/resolveAsset'
import { staggerContainer, fadeUp, scaleIn } from '../../lib/motionVariants'

export default function Hero() {
  const typed = useTypingEffect(profile.titles)
  const [imageFailed, setImageFailed] = useState(false)
  const photoSrc = resolveImage(profile.photoUrl)
  const showPhoto = Boolean(photoSrc) && !imageFailed

  return (
    <section id="hero" aria-label="Introduction" className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-20">
      <FloatingShapes />
      <GlowWords />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.12)}
          className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10"
        >
          <div>
            <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 text-xs font-medium text-muted backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {profile.availability.label}
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-balance text-4xl font-semibold tracking-tight text-fg sm:text-6xl lg:text-7xl">
              Hi, I&apos;m {profile.name.split(' ')[0]}.
              {/*
                The typed line is stacked in a CSS grid together with an invisible copy of
                every title. Grid auto-sizing reserves space for the tallest/widest one up
                front, so the animated text typing/deleting never changes this box's size —
                nothing below or beside it (buttons, social icons, the photo) has to reflow.
              */}
              <span className="mt-2 grid">
                {profile.titles.map((title) => (
                  <span key={title} aria-hidden="true" className="invisible col-start-1 row-start-1">
                    {title}
                  </span>
                ))}
                <span className="col-start-1 row-start-1 bg-gradient-to-r from-accent via-accent to-accent-2 bg-clip-text text-transparent">
                  {typed}
                  <span className="animate-pulse text-accent">|</span>
                </span>
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted">
              {profile.tagline} {profile.summary.split('. ')[0]}.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-5 flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4 text-accent" /> {profile.location}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
              <Button href={profile.resumeUrl} download="Indalu-Taresa-Resume.pdf" icon={Download} magnetic>
                Download Resume
              </Button>
              <Button variant="outline" icon={ArrowRight} onClick={() => scrollToId('contact')}>
                Get in Touch
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex items-center gap-3">
              {social.map((s) => (
                <SocialButton key={s.name} {...s} />
              ))}
            </motion.div>
          </div>

          <motion.div variants={scaleIn} className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative z-0 aspect-square overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-accent/25 via-surface to-accent-2/20 shadow-2xl">
              {showPhoto ? (
                <img
                  src={photoSrc}
                  alt={profile.name}
                  loading="eager"
                  className="absolute inset-0 z-10 h-full w-full object-cover"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div className="absolute inset-0 z-0 flex items-center justify-center text-8xl font-semibold text-accent/25" aria-hidden="true">
                  {profile.initials}
                </div>
              )}
            </div>
            <div className="absolute -bottom-5 -left-5 z-20 rounded-2xl border border-border bg-surface/90 px-5 py-3 shadow-xl backdrop-blur">
              <p className="text-2xl font-semibold text-fg">{profile.yearsExperience}+</p>
              <p className="text-xs text-muted">Years Experience</p>
            </div>

            {/* Headphones + a looping equalizer — a nod to the photo: deep-focus coding with music on. */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -top-5 -right-5 z-20 flex items-center gap-3 rounded-2xl border border-border bg-surface/90 px-4 py-3 shadow-xl backdrop-blur"
            >
              <Headphones className="h-5 w-5 text-accent" aria-hidden="true" />
              <div>
                <AudioWave className="text-accent" />
                <p className="mt-1 text-[11px] font-medium text-muted">Deep Focus Mode</p>
              </div>
            </motion.div>

            <BubblingTerms terms={dataStructureTerms.terms} side="right" className="hidden sm:block" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
