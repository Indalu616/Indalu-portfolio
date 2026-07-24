// Eagerly bundles every image dropped into src/assets/images so JSON files can
// reference them by filename alone (no code changes needed when swapping photos).
const images = import.meta.glob('../assets/images/*.{png,jpg,jpeg,webp,svg,gif}', {
  eager: true,
  import: 'default',
})

const filenameToUrl = Object.fromEntries(
  Object.entries(images).map(([path, url]) => [path.split('/').pop(), url]),
)

/**
 * Resolves a value from a data JSON file (e.g. profile.photoUrl) to a usable image URL.
 * - A bare filename ("portfolio_image.png") resolves to the bundled asset in src/assets/images.
 * - A path starting with "/" or "http" is treated as already-public (public/ folder or remote URL) and returned as-is.
 */
export function resolveImage(value) {
  if (!value) return undefined
  if (value.startsWith('/') || value.startsWith('http')) {
    const filename = value.split('/').pop()
    return filenameToUrl[filename] ?? value
  }
  return filenameToUrl[value] ?? value
}
