import { useState, useEffect } from 'react'
import GradientDot from '../components/GradientDot'
import { loadData, getMilestoneById } from '../store'

function groupByDate(dots) {
  const groups = {}
  ;[...dots].reverse().forEach(dot => {
    const d = new Date(dot.date)
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    const wds = ['일', '월', '화', '수', '목', '금', '토']
    const label = `${d.getMonth() + 1}월 ${d.getDate()}일 ${wds[d.getDay()]}요일`
    if (!groups[key]) groups[key] = { label, dots: [] }
    groups[key].dots.push(dot)
  })
  return Object.values(groups)
}

export default function MyDots({ onSwipeRight }) {
  const [data, setData] = useState(() => loadData())
  const [tooltip, setTooltip] = useState(null)
  const [touchStart, setTouchStart] = useState(null)

  useEffect(() => {
    const handler = () => setData(loadData())
    window.addEventListener('dots-updated', handler)
    return () => window.removeEventListener('dots-updated', handler)
  }, [])

  const groups = groupByDate(data.dots)
  const now = Date.now()

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX)
  const handleTouchEnd = (e) => {
    if (touchStart === null) return
    if (e.changedTouches[0].clientX - touchStart > 60) onSwipeRight()
    setTouchStart(null)
  }

  return (
    <div
      className="screen"
      style={{ padding: '56px 24px 0' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => setTooltip(null)}
    >
      <p style={{ fontSize: 22, fontWeight: 300, marginBottom: 28, color: 'var(--text-primary)', letterSpacing: '-0.2px' }}>나의 점들</p>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }}>
        {groups.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: 80 }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
              아직 기록이 없어요.<br />홈에서 첫 점을 찍어봐요.
            </p>
          </div>
        ) : (
          groups.map((group, gi) => (
            <div key={gi} style={{ marginBottom: 28, animation: `fadeIn 0.4s ${gi * 0.06}s ease both` }}>
              <p style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 12, fontWeight: 500 }}>
                {group.label}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, paddingLeft: 4 }}>
                {group.dots.map(dot => {
                  const age = (now - new Date(dot.date)) / (1000 * 60 * 60 * 24 * 30)
                  const opacity = Math.max(0.55, 1 - age * 0.2)
                  const jitter = ((dot.id % 8) - 4) * 1.5
                  const ms = getMilestoneById(data.milestones, dot.milestoneId)
                  const isSelected = tooltip?.id === dot.id

                  return (
                    <div key={dot.id} style={{ position: 'relative' }}>
                      <div
                        onClick={e => { e.stopPropagation(); setTooltip(isSelected ? null : dot) }}
                        style={{ marginTop: jitter, cursor: 'pointer' }}
                      >
                        <GradientDot
                          colorKey={ms.colorKey}
                          size={isSelected ? 24 : 18}
                          glow={isSelected}
                          opacity={opacity}
                        />
                      </div>

                      {isSelected && (
                        <div style={{
                          position: 'absolute', bottom: 30, left: '50%',
                          transform: 'translateX(-50%)',
                          background: '#ffffff',
                          border: '1px solid #e7e5e4',
                          borderRadius: 12, padding: '8px 12px',
                          whiteSpace: 'nowrap', zIndex: 10,
                          boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
                          animation: 'fadeIn 0.2s ease both',
                          minWidth: 140,
                        }}>
                          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                            {dot.label || '기록'}
                          </p>
                          <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{ms.name}</p>
                          {dot.note && (
                            <p style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>{dot.note}</p>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Legend — 사용자 마일스톤 */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, var(--bg) 70%, transparent)',
        padding: '32px 24px 28px',
      }}>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {data.milestones.map(m => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <GradientDot colorKey={m.colorKey} size={10} />
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{m.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
