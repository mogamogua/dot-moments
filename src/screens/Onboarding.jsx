import { useState } from 'react'
import GradientDot from '../components/GradientDot'
import { DOT_COLORS } from '../store'

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

  if (!isMilestoneSlide) {
    const slide = INFO_SLIDES[idx]
    return (
      <div className="screen" style={{ justifyContent: 'space-between', padding: '80px 32px 56px' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            {slide.dots.map((d, i) => (
              <GradientDot
                key={i} colorKey={d.colorKey} size={d.size} glow
                style={{ animation: `dotAppear 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.12}s both` }}
              />
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontSize: 22, fontWeight: 300, lineHeight: 1.5, color: 'var(--text-primary)', whiteSpace: 'pre-line', marginBottom: slide.sub ? 12 : 0, letterSpacing: '-0.2px' }}>
            {slide.title}
          </p>
          {slide.sub && <p style={{ fontSize: 16, color: 'var(--text-secondary)' }}>{slide.sub}</p>}
        </div>

        <div className="step-dots" style={{ marginBottom: 28 }}>
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <div key={i} className={`step-dot${i === idx ? ' active' : ''}`} />
          ))}
        </div>

        <button className="btn-main" onClick={() => setIdx(idx + 1)}>
          다음 →
        </button>
      </div>
    )
  }

  // Milestone creation slide
  return (
    <div className="screen" style={{ padding: '64px 24px 48px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 22, fontWeight: 300, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.5, letterSpacing: '-0.3px' }}>
          어떤 것들을 시작해보고 싶나요?
        </p>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>
          나만의 마일스톤을 만들어봐요. 최대 5개.
        </p>

        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="예: 논문, 운동, 사이드 프로젝트..."
            maxLength={16}
            autoFocus
            style={{
              flex: 1,
              background: '#ffffff',
              border: '1px solid #d6d3d1',
              borderRadius: 8,
              padding: '13px 16px',
              color: 'var(--text-primary)',
              fontSize: 15,
              fontFamily: 'inherit',
              outline: 'none',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => e.target.style.borderColor = '#292524'}
            onBlur={e => e.target.style.borderColor = '#d6d3d1'}
          />
          <button
            onClick={addMilestone}
            disabled={!input.trim() || milestones.length >= 5}
            style={{
              background: input.trim() && milestones.length < 5 ? '#292524' : '#f0efed',
              border: 'none',
              borderRadius: 9999,
              color: input.trim() && milestones.length < 5 ? '#ffffff' : '#a8a29e',
              fontFamily: 'inherit',
              fontSize: 20,
              width: 48,
              cursor: input.trim() && milestones.length < 5 ? 'pointer' : 'default',
              transition: 'all 0.15s',
              flexShrink: 0,
            }}
          >
            +
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          {milestones.map(m => (
            <div
              key={m.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: '#ffffff',
                border: '1px solid #e7e5e4',
                borderRadius: 16, padding: '13px 16px',
                animation: 'fadeIn 0.3s ease both',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              }}
            >
              <GradientDot colorKey={m.colorKey} size={16} />
              <span style={{ flex: 1, fontSize: 15, color: 'var(--text-primary)', fontWeight: 500 }}>{m.name}</span>
              <button
                onClick={() => removeMilestone(m.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', fontSize: 18, lineHeight: 1, padding: '0 2px' }}
              >×</button>
            </div>
          ))}

          {milestones.length === 0 && (
            <p style={{ fontSize: 13, color: 'var(--text-dim)', textAlign: 'center', marginTop: 16 }}>
              아직 마일스톤이 없어요.
            </p>
          )}
        </div>
      </div>

      <div className="step-dots" style={{ marginBottom: 20 }}>
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <div key={i} className={`step-dot${i === idx ? ' active' : ''}`} />
        ))}
      </div>

      <button
        className="btn-main"
        onClick={() => milestones.length > 0 && onDone(milestones)}
        disabled={milestones.length === 0}
      >
        시작하기
      </button>
      <button className="btn-ghost" style={{ marginTop: 10 }} onClick={() => onDone([])}>
        나중에 설정할게요
      </button>
    </div>
  )
}
