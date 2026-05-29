import { useState, useEffect } from 'react'
import GradientDot from '../components/GradientDot'
import { loadData, getTodayDots, getMilestoneById } from '../store'

export default function Home({ onQuickStart, onStepByStep, onSwipeLeft }) {
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
      className="screen screen-padding screen-padding--nav flex justify-between"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div>
        <span className="text-[13px] text-body">{today}</span>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-4">
        {hasTodayDot ? (
          <div className="animate-[fadeIn_0.5s_ease_both] text-center">
            <div className="mb-6 flex justify-center">
              {(() => {
                const lastDot = todayDots[todayDots.length - 1]
                const ms = getMilestoneById(data.milestones, lastDot.milestoneId)
                return (
                  <GradientDot
                    colorKey={ms.colorKey}
                    size={72}
                    glow
                    className="animate-[dotAppear_0.7s_cubic-bezier(0.34,1.56,0.64,1)_both]"
                  />
                )
              })()}
            </div>
            <p className="mb-2 text-xl font-light tracking-tight text-ink">오늘 점을 찍었어요.</p>
            <p className="text-sm text-body">{todayDots.length}개의 기록이 남겨졌어요</p>
            <button type="button" className="btn-secondary btn-secondary--center text-sm" onClick={onStepByStep}>
              하나 더 찍을까요?
            </button>
          </div>
        ) : (
          <>
            <p className="mb-2 text-[clamp(20px,6vw,26px)] font-light leading-snug tracking-tight text-ink">
              오늘 어때요?
            </p>
            <button type="button" className="btn-primary btn-primary--stacked" onClick={onQuickStart}>
              <span className="text-[22px]">🌧</span>
              <span className="text-[clamp(14px,4vw,16px)] font-semibold leading-snug">시작하기 어려워요</span>
              <span className="text-[clamp(11px,3vw,12px)] text-body">장벽을 같이 없애볼게요</span>
            </button>
            <button type="button" className="btn-primary btn-primary--stacked" onClick={onStepByStep}>
              <span className="text-[22px]">🌤</span>
              <span className="text-[clamp(14px,4vw,16px)] font-semibold leading-snug">해볼 수 있을 것 같아요</span>
              <span className="text-[clamp(11px,3vw,12px)] text-body">실행하고 기록해요</span>
            </button>
          </>
        )}
      </div>

      <div>
        <div className="flex items-center gap-3 border-t border-border py-4">
          <p className="whitespace-nowrap text-[clamp(11px,3.5vw,13px)] text-body">
            지금까지{' '}
            <span className="font-semibold text-ink">{data.dots.length}개</span>
            의 점을 찍었어요.
          </p>
          <div className="ml-auto flex gap-1.5">
            {recentDots.slice(0, 4).map((d, i) => {
              const ms = getMilestoneById(data.milestones, d.milestoneId)
              return <GradientDot key={i} colorKey={ms.colorKey} size={12} opacity={1 - i * 0.15} />
            })}
          </div>
        </div>
        <p
          role="button"
          tabIndex={0}
          onClick={onSwipeLeft}
          onKeyDown={e => e.key === 'Enter' && onSwipeLeft()}
          className="mt-2 cursor-pointer overflow-hidden whitespace-nowrap text-center text-[clamp(10px,3vw,12px)] text-dim animate-[swipeHint_2s_ease-in-out_infinite]"
        >
          ← 내 점들 보기
        </p>
      </div>
    </div>
  )
}
