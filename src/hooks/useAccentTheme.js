import { useContext } from 'react'
import { AccentContext } from '../context/accent-context'

export function useAccentTheme() {
  const ctx = useContext(AccentContext)
  if (!ctx) throw new Error('useAccentTheme must be used within an AccentThemeProvider')
  return ctx
}
