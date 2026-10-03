/**
 * Accent palette. The HUD redesign uses a single fixed signal-orange accent, so
 * the list has one entry and the auto-cycle in AccentThemeProvider is skipped.
 * Add more colors here to re-enable cycling.
 */
export const ACCENT_COLORS = ['#FF8A00']

/** Secondary accent used for gradients/highlights alongside the primary. */
export const ACCENT_SECONDARY = '#FFB547'

/** How long each accent color stays active before transitioning to the next. */
export const ACCENT_CYCLE_INTERVAL_MS = 5000

/** Duration of the interpolated transition between two accent colors. */
export const ACCENT_TRANSITION_DURATION_MS = 950
