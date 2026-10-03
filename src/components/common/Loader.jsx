export default function Loader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="flex items-center gap-3" role="status" aria-label="Loading">
        <span className="h-3 w-3 rotate-45 animate-pulse border border-accent bg-accent/30" />
        <span className="hud-label text-muted">Loading module</span>
      </div>
    </div>
  )
}
