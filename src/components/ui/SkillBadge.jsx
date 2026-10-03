import { memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const SEGMENTS = 20

/** Skill name + segmented HUD proficiency meter used inside Skills category cards. */
function SkillBadge({ name, level = 0, className }) {
  const filled = Math.round((level / 100) * SEGMENTS)
  return (
    <div className={cn('group', className)}>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-fg/90">{name}</span>
        <span className="font-mono text-[11px] text-accent">{level}%</span>
      </div>
      <div className="flex gap-[3px]" role="meter" aria-valuenow={level} aria-valuemin={0} aria-valuemax={100} aria-label={`${name} proficiency`}>
        {Array.from({ length: SEGMENTS }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.15 }}
            whileInView={{ opacity: i < filled ? 1 : 0.15 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.25, delay: i * 0.03 }}
            className={cn('h-1.5 flex-1', i < filled ? 'bg-accent' : 'bg-white/30')}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(SkillBadge)
