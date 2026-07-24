import { SITE_CONFIG } from '../constants/siteConfig'

/**
 * Applies meta tags, OpenGraph, and JSON-LD structured data to <head>.
 * Vite has no server-side head management, so we do it imperatively on mount.
 */
export function applySEO({
  title = SITE_CONFIG.siteName,
  description = SITE_CONFIG.defaultDescription,
  image = '/og-image.png',
  url = SITE_CONFIG.siteUrl,
} = {}) {
  document.title = title
  setMeta('description', description)
  setMeta('og:title', title, 'property')
  setMeta('og:description', description, 'property')
  setMeta('og:image', image, 'property')
  setMeta('og:url', url, 'property')
  setMeta('og:type', 'website', 'property')
  setMeta('twitter:card', 'summary_large_image')
  setMeta('twitter:title', title)
  setMeta('twitter:description', description)
  setMeta('twitter:image', image)
  setStructuredData({ title, description, url })
}

function setMeta(name, content, attr = 'name') {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setStructuredData({ title, description, url }) {
  const id = 'structured-data-person'
  let script = document.getElementById(id)
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = id
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: title,
    description,
    url,
    jobTitle: 'Software Engineer',
  })
}
