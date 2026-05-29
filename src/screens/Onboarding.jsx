import { useState } from 'react'
import GradientDot from '../components/GradientDot'
import { DOT_COLORS } from '../store'
import { cn } from '../lib/cn'

const INFO_SLIDES = [
  {
    dots: [{ colorKey: 'purple', size: 56 }],
    title: '시작하지 못하는 건\n게으른 게 아니에요.',
  },
  {
    dots: [
      { colorKey: 'blue',   size: 36 },
      { colorKey: 'orange', size: 52 },
      { colorKey: 'green',  size: 32 },
    ],
    title: '완료하지 않아도 괜찮아요.',
    sub: '시작했다는 것만 기록해요.',
  },
  {
    dots: [
      { colorKey: 'blue',   size: 28 },
      { colorKey: 'purple', size: 44 },
      { colorKey: 'orange', size: 36 },
      { colorKey: 'green',  size: 20 },
      { colorKey: 'pink',   size: 32 },
    ],
    title: '시작할 때마다\n점 하나가 찍혀요.',
  },
]

const TOTAL_SLIDES = INFO_SLIDES.length + 1

export default function Onboarding({ onDone }) {
  const [idx, setIdx] = useState(0)
  const [milestones, setMilestones] = useState([])
  const [input, setInput] = useState('')

  const isMilestoneSlide = idx === INFO_SLIDES.length

  const addMilestone = () => {
    const name = input.trim()
    if (!name || milestones.length >= 5) return
    const colorKey = DOT_COLORS[milestones.length % DOT_COLORS.length].key
    setMilestones(prev => [...prev, { id: `ms_${Date.now()}`, name, colorKey }])
    setInput('')
  }

  const removeMilestone = (id) => setMilestones(prev => prev.filter(m => m.id !== id))

  const handleKeyDown = (e) => { if (e.key === 'Enter') { e.preventDefault(); addMilestone() } }

  const canAdd = input.trim() && milestones.length < 5

  if (!isMilestoneSlide) {
    const slide = INFO_SLIDES[idx]
    return (
      <div className="screen flex justify-between px-8 pb-14 pt-20">
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {slide.dots.map((d, i) => (
              <GradientDot
                key={i}
                colorKey={d.colorKey}
                size={d.size}
                glow
                className="animate-[dotAppear_0.6s_cubic-bezier(0.34,1.56,0.64,1)_both]"
                style={{ animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </div>
        </div>

        <div className="mb-12 text-center">
          <p className={cn(
            'whitespace-pre-line text-[22px] font-light leading-relaxed tracking-tight text-ink',
            slide.sub ? 'mb-3' : 'mb-0',
          )}>
            {slide.title}
          </p>
          {slide.sub && <p className="text-base text-body">{slide.sub}</p>}
        </div>

        <div className="step-dots mb-7">
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <div key={i} className={`step-dot${i === idx ? ' active' : ''}`} />
          ))}
        </div>

        <button type="button" className="btn-main" onClick={() => setIdx(idx + 1)}>
          다음 →
        </button>
      </div>
    )
  }

  return (
    <div className="screen flex flex-col px-6 pb-12 pt-16">
      <div className="flex flex-1 flex-col">
        <p className="mb-2 text-[22px] font-light leading-relaxed tracking-tight text-ink">
          어떤 것들을 시작해보고 싶나요?
        </p>
        <p className="mb-8 text-sm text-body">나만의 마일스톤을 만들어봐요. 최대 5개.</p>

        <div className="mb-5 flex gap-2.5">
          <input
            className="input-inline"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="예: 논문, 운동, 사이드 프로젝트..."
            maxLength={16}
            autoFocus
          />
          <button
            type="button"
            className="btn-add"
            onClick={addMilestone}
            disabled={!canAdd}
          >
            +
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-2.5">
          {milestones.map(m => (
            <div key={m.id} className="milestone-row">
              <GradientDot colorKey={m.colorKey} size={16} />
              <span className="flex-1 text-[15px] font-medium text-ink">{m.name}</span>
              <button
                type="button"
                onClick={() => removeMilestone(m.id)}
                className="border-0 bg-transparent px-0.5 text-lg leading-none text-dim cursor-pointer"
              >
                ×
              </button>
            </div>
          ))}

          {milestones.length === 0 && (
            <p className="mt-4 text-center text-[13px] text-dim">아직 마일스톤이 없어요.</p>
          )}
        </div>
      </div>

      <div className="step-dots mb-5">
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <div key={i} className={`step-dot${i === idx ? ' active' : ''}`} />
        ))}
      </div>

      <button
        type="button"
        className="btn-main"
        onClick={() => milestones.length > 0 && onDone(milestones)}
        disabled={milestones.length === 0}
      >
        시작하기
      </button>
      <button type="button" className="btn-ghost mt-2.5" onClick={() => onDone([])}>
        나중에 설정할게요
      </button>
    </div>
  )
}
