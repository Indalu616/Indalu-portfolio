import { useCallback, useSyncExternalStore } from 'react'

function subscribe(query, callback) {
  const mql = window.matchMedia(query)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

/** Reactively tracks a CSS media query using useSyncExternalStore (avoids effect+setState races). */
export function useMediaQuery(query) {
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query])
  const subscribeToQuery = useCallback((callback) => subscribe(query, callback), [query])
  return useSyncExternalStore(subscribeToQuery, getSnapshot, () => false)
}
