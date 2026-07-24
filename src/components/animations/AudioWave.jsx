import { cn } from '../../utils/cn'

// Each bar reuses the same CSS `eq` keyframe (defined in index.css) but with its own
// duration/delay via inline style, so the wave looks like a real equalizer instead of
// four bars moving in perfect sync.
const BARS = [
  { duration: '1.1s', delay: '0s' },
  { duration: '0.9s', delay: '0.15s' },
  { duration: '1.3s', delay: '0.3s' },
  { duration: '1s', delay: '0.45s' },
]

/** Small looping equalizer/waveform (pure CSS), used to hint "music playing" next to the hero photo. */
export default function AudioWave({ className }) {
  return (
    <div className={cn('flex h-4 items-end gap-[3px]', className)} aria-hidden="true">
      {BARS.map((bar, i) => (
        <span
          key={i}
          className="block h-full w-[3px] origin-bottom animate-eq rounded-full bg-current"
          style={{ animationDuration: bar.duration, animationDelay: bar.delay }}
        />
      ))}
    </div>
  )
}
