/**
 * Curated accent palette the dynamic theme cycles through. Order defines the
 * cycling sequence; edit this list to change which colors are in rotation.
 */
export const ACCENT_COLORS = [
  '#8B5CF6', // Claude Purple
  '#3B82F6', // Vercel Blue
  '#06B6D4', // Copilot Cyan
  '#10B981', // Emerald
  '#6366F1', // Stripe Indigo
  '#22D3EE', // Neon Aqua
]

/** How long each accent color stays active before transitioning to the next. */
export const ACCENT_CYCLE_INTERVAL_MS = 5000

/** Duration of the interpolated transition between two accent colors. */
export const ACCENT_TRANSITION_DURATION_MS = 950
