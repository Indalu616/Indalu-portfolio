/**
 * Placeholder contact form submission service.
 * Swap the resolved promise for a real fetch() call to your backend/form endpoint.
 */
export async function submitContactForm(payload) {
  await new Promise((resolve) => setTimeout(resolve, 900))
  if (!payload.email || !payload.message) {
    throw new Error('Missing required fields')
  }
  return { ok: true }
}
