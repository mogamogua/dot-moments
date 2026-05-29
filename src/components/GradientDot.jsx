import { getColorByKey } from '../store'
import { cn } from '../lib/cn'

const FLAT_THRESHOLD = 20

export default function GradientDot({ colorKey = 'purple', size = 14, glow = false, opacity = 1, className, style = {} }) {
  const color = getColorByKey(colorKey)
  const isFlat = size <= FLAT_THRESHOLD
  const bg = isFlat ? color.flat : color.gradient

  return (
    <span
      className={cn('inline-block shrink-0 rounded-full transition-all', className)}
      style={{
        width: size,
        height: size,
        background: bg,
        opacity,
        boxShadow: glow && !isFlat ? `0 0 24px ${color.glow}, 0 0 48px ${color.glow}` : 'none',
        ...style,
      }}
    />
  )
}
