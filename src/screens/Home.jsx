import { useState, useEffect } from 'react'
import GradientDot from '../components/GradientDot'
import { loadData, getTodayDots, getMilestoneById } from '../store'

export default function Home({ onModeA, onModeB, onSwipeLeft }) {
  const [data, setData] = useState(() => loadData())
  const [today, setToday] = useState('')
  const [touchStart, setTouchStart] = useState(null)

  useEffect(() => {
    const d = new Date()
    const wds = ['일', '월', '화', '수', '목', '금', '토']
    setToday(`${d.getMonth() + 1}월 ${d.getDate()}일 ${wds[d.getDay()]}요일`)
  }, [])

  useEffect(() => {
    const handler = () => setData(loadData())
    window.addEventListener('dots-updated', handler)
    return () => window.removeEventListener('dots-updated', handler)
  }, [])

  const todayDots = getTodayDots()
  const hasTodayDot = todayDots.length > 0
  const recentDots = [...data.dots].reverse().slice(0, 5)

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX)
  const handleTouchEnd = (e) => {
    if (touchStart === null) return
    if (touchStart - e.changedTouches[0].clientX > 60) onSwipeLeft()
    setTouchStart(null)
  }

  return (
    <div
      className="screen"
      style={{ padding: '56px 24px 40px', justifyContent: 'space-between' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{today}</span>
        <button
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          onClick={() => {
            if (confirm('모든 데이터가 삭제되고 온보딩부터 다시 시작해요. 계속할까요?')) {
              localStorage.clear(); window.location.reload()
            }
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="5" r="1.5" fill="#666"/>
            <circle cx="10" cy="10" r="1.5" fill="#666"/>
            <circle cx="10" cy="15" r="1.5" fill="#666"/>
          </svg>
        </button>
      </div>

      {/* Check-in */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
        {hasTodayDot ? (
          <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease both' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              {(() => {
                const lastDot = todayDots[todayDots.length - 1]
                const ms = getMilestoneById(data.milestones, lastDot.milestoneId)
                return (
                  <GradientDot
                    colorKey={ms.colorKey}
                    size={72}
                    glow
                    style={{ animation: 'dotAppear 0.7s cubic-bezier(0.34,1.56,0.64,1) both' }}
                  />
                )
              })()}
            </div>
            <p style={{ fontSize: 20, fontWeight: 300, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.2px' }}>
              오늘 점을 찍었어요.
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
              {todayDots.length}개의 기록이 남겨졌어요
            </p>
            <button className="btn-secondary" style={{ marginTop: 28, fontSize: 14 }} onClick={onModeA}>
              하나 더 찍을까요?
            </button>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 'clamp(20px, 6vw, 26px)', fontWeight: 300, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.4, letterSpacing: '-0.3px' }}>
              오늘 어때요?
            </p>
            <button className="btn-primary" onClick={onModeA} style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '18px 20px', gap: 6 }}>
              <span style={{ fontSize: 22 }}>🌧</span>
              <div style={{ fontWeight: 600, fontSize: 'clamp(14px, 4vw, 16px)', lineHeight: 1.3 }}>시작하기 어려워요</div>
              <div style={{ fontSize: 'clamp(11px, 3vw, 12px)', color: 'var(--text-secondary)' }}>장벽을 같이 없애볼게요</div>
            </button>
            <button className="btn-primary" onClick={onModeB} style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '18px 20px', gap: 6 }}>
              <span style={{ fontSize: 22 }}>🌤</span>
              <div style={{ fontWeight: 600, fontSize: 'clamp(14px, 4vw, 16px)', lineHeight: 1.3 }}>해볼 수 있을 것 같아요</div>
              <div style={{ fontSize: 'clamp(11px, 3vw, 12px)', color: 'var(--text-secondary)' }}>실행하고 기록해요</div>
            </button>
          </>
        )}
      </div>

      {/* Bottom stats */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 0', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: 'clamp(11px, 3.5vw, 13px)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
            지금까지{' '}
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{data.dots.length}개</span>
            의 점을 찍었어요.
          </p>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
            {recentDots.slice(0, 4).map((d, i) => {
              const ms = getMilestoneById(data.milestones, d.milestoneId)
              return <GradientDot key={i} colorKey={ms.colorKey} size={12} opacity={1 - i * 0.15} />
            })}
          </div>
        </div>
        <p style={{ fontSize: 'clamp(10px, 3vw, 12px)', color: 'var(--text-dim)', textAlign: 'center', marginTop: 8, animation: 'swipeHint 2s ease-in-out infinite', whiteSpace: 'nowrap', overflow: 'hidden' }}>
          ← 스와이프하면 내 점들을 볼 수 있어요
        </p>
      </div>
    </div>
  )
}
