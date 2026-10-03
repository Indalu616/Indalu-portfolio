import { memo, useState } from 'react'
import { ExternalLink, ArrowUpRight } from 'lucide-react'
import Card from './Card'
import Tag from '../ui/Tag'
import Badge from '../ui/Badge'
import { GithubIcon } from '../ui/BrandIcons'
import { resolveImage } from '../../utils/resolveAsset'

/** HUD project card with preview (or generated placeholder), tags, and quick links. `onCaseStudy` opens the detail modal. */
function ProjectCard({ project, index = 0, onCaseStudy }) {
  const { title, description, image, technologies, github, liveDemo, featured } = project
  const [imgFailed, setImgFailed] = useState(false)
  const src = resolveImage(image)
  const showImage = Boolean(src) && !imgFailed

  return (
    <Card hover className="group flex h-full flex-col">
      <div className="relative m-2 mb-0 aspect-video overflow-hidden border border-white/[0.06] bg-[#0a0a0a]">
        {showImage ? (
          <img
            src={src}
            alt={`${title} preview`}
            loading="lazy"
            className="h-full w-full object-cover opacity-85 grayscale-[35%] transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center" aria-hidden="true">
            <div className="hud-grid absolute inset-0 opacity-70" />
            <div className="absolute -bottom-10 left-1/2 h-32 w-3/4 -translate-x-1/2 rounded-full bg-accent/25 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
            <span className="relative font-display text-3xl font-bold uppercase tracking-[0.1em] text-white/[0.08] transition-colors duration-500 group-hover:text-accent/30">
              {title.split(/\s+/).map((w) => w[0]).join('').slice(0, 3)}
            </span>
          </div>
        )}
        <span className="absolute left-2 top-2 bg-black/70 px-1.5 py-0.5 font-mono text-[9px] tracking-widest text-white/70 backdrop-blur">
          PRJ_{String(index + 1).padStart(2, '0')}
        </span>
        {featured && (
          <Badge variant="accent" className="absolute right-2 top-2 bg-black/70 !px-2 !py-0.5 !text-[9px]">
            Featured
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-semibold uppercase tracking-wide text-fg transition-colors group-hover:text-accent">{title}</h3>
        <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-muted">{description}</p>
        <div className="mt-3 mb-auto flex flex-wrap gap-1.5">
          {technologies.slice(0, 3).map((t) => (
            <Tag key={t} className="px-2 py-0.5 text-[10px]">{t}</Tag>
          ))}
        </div>
        <div className="mt-4 flex min-h-[2.75rem] items-center justify-between gap-2 border-t border-white/[0.07] pt-3">
          <div className="flex items-center gap-3">
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" aria-label={`${title} source on GitHub`} className="text-muted transition-colors hover:text-accent">
                <GithubIcon className="h-4.5 w-4.5" />
              </a>
            )}
            {liveDemo && (
              <a
                href={liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} live demo (opens in a new tab)`}
                className="chamfer-sm inline-flex items-center gap-1.5 border border-accent/50 bg-accent/5 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-accent transition-colors hover:bg-accent hover:text-black"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                Live <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
          <button
            type="button"
            onClick={() => onCaseStudy(project)}
            className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent transition-colors hover:text-accent-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Details <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </Card>
  )
}

export default memo(ProjectCard)
