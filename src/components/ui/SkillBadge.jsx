import { memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

/** Skill name + animated proficiency bar used inside Skills category cards. */
function SkillBadge({ name, level = 0, className }) {
  return (
    <div className={cn('group', className)}>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium text-fg">{name}</span>
        <span className="text-xs text-muted">{level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/60">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
        />
      </div>
    </div>
  )
}

export default memo(SkillBadge)
