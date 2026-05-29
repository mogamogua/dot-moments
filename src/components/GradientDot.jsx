import { getColorByKey } from '../store'

const FLAT_THRESHOLD = 20

export default function GradientDot({ colorKey = 'purple', size = 14, glow = false, opacity = 1, style = {} }) {
  const color = getColorByKey(colorKey)
  const isFlat = size <= FLAT_THRESHOLD
  const bg = isFlat ? color.flat : color.gradient

  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'inline-block',
        flexShrink: 0,
        background: bg,
        opacity,
        boxShadow: glow && !isFlat ? `0 0 24px ${color.glow}, 0 0 48px ${color.glow}` : 'none',
        transition: 'all 0.2s',
        ...style,
      }}
    />
  )
}
