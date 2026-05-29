import { useEffect, useState } from 'react'
import { getColorByKey } from '../store'

export default function DotReveal({ milestone = { name: '기타', colorKey: 'purple' }, onDone }) {
  const [phase, setPhase] = useState('appear')
  const color = getColorByKey(milestone.colorKey)

  useEffect(() => {
    const t = setTimeout(() => setPhase('pulse'), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', zIndex: 100,
    }}>
      {phase === 'pulse' && [1, 2, 3].map(i => (
        <div key={i} style={{
          position: 'absolute',
          width: 120, height: 120,
          borderRadius: '50%',
          border: `1px solid ${color.glow}`,
          left: '50%', top: '45%',
          animation: `ripple ${1.2 + i * 0.4}s ease-out ${i * 0.2}s infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{
        width: 96, height: 96,
        borderRadius: '50%',
        background: color.gradient,
        animation: phase === 'appear'
          ? 'dotAppear 0.8s cubic-bezier(0.34,1.56,0.64,1) both'
          : 'dotPulse 2s ease-in-out infinite',
        boxShadow: `0 0 40px ${color.glow}, 0 0 80px ${color.glow}`,
        '--glow-color': color.glow,
      }} />

      <div style={{ marginTop: 48, textAlign: 'center', animation: 'slideUp 0.5s 0.6s ease both', opacity: 0 }}>
        <p style={{ fontSize: 22, fontWeight: 300, color: 'var(--text-primary)', marginBottom: 10, letterSpacing: '-0.2px' }}>
          점 하나가 찍혔어요.
        </p>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: '#f0efed', borderRadius: 9999, padding: '5px 14px',
        }}>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{milestone.name}</span>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 48, left: 24, right: 24,
        animation: 'slideUp 0.5s 1.2s ease both', opacity: 0,
      }}>
        <button className="btn-main" onClick={onDone}>홈으로</button>
      </div>
    </div>
  )
}
