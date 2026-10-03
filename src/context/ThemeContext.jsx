import { useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './theme-context'

const STORAGE_KEY = 'portfolio-theme'

function getInitialTheme() {
  // The HUD redesign is dark-only; the provider is kept so existing consumers keep working.
  return 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* storage unavailable — theme is fixed anyway */
    }
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
      setTheme,
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
