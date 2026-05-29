import { useEffect, useState } from 'react'
import { getColorByKey } from '../store'

const RIPPLE_SIZE = 120

export default function DotReveal({ milestone = { name: '기타', colorKey: 'purple' }, onDone }) {
  const [phase, setPhase] = useState('appear')
  const color = getColorByKey(milestone.colorKey)

  useEffect(() => {
    const t = setTimeout(() => setPhase('pulse'), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-bg">
      {/* Dot + ripple rings share one center point */}
      <div className="relative size-24 shrink-0">
        {phase === 'pulse' && [1, 2, 3].map(i => (
          <div
            key={i}
            className="pointer-events-none absolute rounded-full"
            style={{
              width: RIPPLE_SIZE,
              height: RIPPLE_SIZE,
              left: '50%',
              top: '50%',
              marginLeft: -RIPPLE_SIZE / 2,
              marginTop: -RIPPLE_SIZE / 2,
              border: `1px solid ${color.glow}`,
              animation: `ripple-scale ${1.2 + i * 0.4}s ease-out ${i * 0.2}s infinite`,
            }}
          />
        ))}

        <div
          className="relative z-10 size-24 rounded-full"
          style={{
            background: color.gradient,
            animation: phase === 'appear'
              ? 'dotAppear 0.8s cubic-bezier(0.34,1.56,0.64,1) both'
              : 'dotPulse 2s ease-in-out infinite',
            boxShadow: `0 0 40px ${color.glow}, 0 0 80px ${color.glow}`,
            '--glow-color': color.glow,
          }}
        />
      </div>

      <div className="mt-12 animate-[slideUp_0.5s_0.6s_ease_both] text-center opacity-0">
        <p className="mb-2.5 text-[22px] font-light tracking-tight text-ink">점 하나가 찍혔어요.</p>
        <div className="inline-flex items-center gap-1.5 rounded-pill bg-surface px-3.5 py-1.5">
          <span className="text-[13px] text-body">{milestone.name}</span>
        </div>
      </div>

      <div className="absolute bottom-12 left-6 right-6 animate-[slideUp_0.5s_1.2s_ease_both] opacity-0">
        <button type="button" className="btn-main" onClick={onDone}>홈으로</button>
      </div>
    </div>
  )
}
