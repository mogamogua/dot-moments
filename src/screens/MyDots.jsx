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
      className="screen screen-padding screen-padding--nav !pb-0"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => setTooltip(null)}
    >
      <div className="mb-7 flex items-center gap-3">
        <button
          type="button"
          onClick={onSwipeRight}
          className="flex items-center pl-0 pr-1 text-xl leading-none text-body"
          aria-label="홈으로 돌아가기"
        >
          ←
        </button>
        <p className="text-[22px] font-light tracking-tight text-ink">나의 점들</p>
      </div>

      <div className="flex-1 overflow-y-auto pb-[120px]">
        {groups.length === 0 ? (
          <div className="mt-20 text-center">
            <p className="text-[15px] text-body">
              아직 기록이 없어요.<br />홈에서 첫 점을 찍어봐요.
            </p>
          </div>
        ) : (
          groups.map((group, gi) => (
            <div
              key={gi}
              className="mb-7 animate-[fadeIn_0.4s_ease_both]"
              style={{ animationDelay: `${gi * 0.06}s` }}
            >
              <p className="mb-3 text-xs font-medium text-dim">{group.label}</p>
              <div className="flex flex-wrap gap-3.5 pl-1">
                {group.dots.map(dot => {
                  const age = (now - new Date(dot.date)) / (1000 * 60 * 60 * 24 * 30)
                  const opacity = Math.max(0.55, 1 - age * 0.2)
                  const jitter = ((dot.id % 8) - 4) * 1.5
                  const ms = getMilestoneById(data.milestones, dot.milestoneId)
                  const isSelected = tooltip?.id === dot.id

                  return (
                    <div key={dot.id} className="relative">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={e => { e.stopPropagation(); setTooltip(isSelected ? null : dot) }}
                        onKeyDown={e => e.key === 'Enter' && (e.stopPropagation(), setTooltip(isSelected ? null : dot))}
                        className="cursor-pointer"
                        style={{ marginTop: jitter }}
                      >
                        <GradientDot
                          colorKey={ms.colorKey}
                          size={isSelected ? 24 : 18}
                          glow={isSelected}
                          opacity={opacity}
                        />
                      </div>

                      {isSelected && (
                        <div className="absolute bottom-[30px] left-1/2 z-10 min-w-[140px] -translate-x-1/2 animate-[fadeIn_0.2s_ease_both] whitespace-nowrap rounded-card border border-border bg-card px-3 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.10)]">
                          <p className="mb-0.5 text-xs font-semibold text-ink">{dot.label || '기록'}</p>
                          <p className="text-[11px] text-body">{ms.name}</p>
                          {dot.note && (
                            <p className="mt-1 text-[11px] text-dim">{dot.note}</p>
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

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg from-70% to-transparent px-6 pb-7 pt-8">
        <div className="flex flex-wrap gap-3.5">
          {data.milestones.map(m => (
            <div key={m.id} className="flex items-center gap-1.5">
              <GradientDot colorKey={m.colorKey} size={10} />
              <span className="text-xs text-body">{m.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
