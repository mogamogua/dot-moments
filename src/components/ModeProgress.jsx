import { cn } from '../lib/cn'

export default function ModeProgress({ step, total = 4 }) {
  return (
    <div className="mb-6 flex shrink-0 gap-1">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={cn(
            'h-1 flex-1 rounded-sm transition-colors',
            i < step ? 'bg-accent' : 'bg-border',
          )}
        />
      ))}
    </div>
  )
}
