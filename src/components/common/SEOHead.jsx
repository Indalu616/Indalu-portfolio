import { useEffect } from 'react'
import { applySEO } from '../../services/seo'

/** Applies document-level SEO meta tags on mount. See services/seo.js for the reusable utility. */
export default function SEOHead(props) {
  useEffect(() => {
    applySEO(props)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}
