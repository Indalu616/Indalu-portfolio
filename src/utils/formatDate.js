const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** Formats "YYYY-MM" into "Month YYYY". Passes through free-text values (e.g. "Present"). */
export function formatMonthYear(value) {
  if (!value) return ''
  const match = /^(\d{4})-(\d{2})$/.exec(value)
  if (!match) return value
  const [, year, month] = match
  const label = MONTHS[Number(month) - 1]
  return label ? `${label} ${year}` : value
}
