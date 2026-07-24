import { memo } from 'react'
import { ExternalLink, ArrowUpRight } from 'lucide-react'
import Card from './Card'
import Tag from '../ui/Tag'
import Badge from '../ui/Badge'
import { GithubIcon } from '../ui/BrandIcons'

/** Premium project card with image, tags, and quick links. `onCaseStudy` opens the detail modal. */
function ProjectCard({ project, onCaseStudy }) {
  const { title, description, image, technologies, github, liveDemo, featured } = project

  return (
    <Card hover className="group flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-accent/20 via-surface to-accent-2/10">
        <img
          src={image}
          alt={`${title} preview`}
          loading="lazy"
          className="h-full w-full scale-100 object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        {featured && (
          <Badge variant="accent" className="absolute left-4 top-4 backdrop-blur">
            Featured
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-fg">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {technologies.slice(0, 5).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-3">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} source on GitHub`}
                className="text-muted transition-colors hover:text-accent"
              >
                <GithubIcon className="h-4.5 w-4.5" />
              </a>
            )}
            {liveDemo && (
              <a
                href={liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} live demo`}
                className="text-muted transition-colors hover:text-accent"
              >
                <ExternalLink className="h-4.5 w-4.5" />
              </a>
            )}
          </div>
          <button
            type="button"
            onClick={() => onCaseStudy(project)}
            className="inline-flex items-center gap-1 text-sm font-medium text-fg transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            Case study <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </Card>
  )
}

export default memo(ProjectCard)
