import { useState } from 'react'
import GradientDot from './GradientDot'
import { DOT_COLORS, loadData, saveData } from '../store'

export default function MilestoneSetup({ onSave, onClose, initialMilestones = [] }) {
  const [milestones, setMilestones] = useState(initialMilestones)
  const [input, setInput] = useState('')

  const existing = loadData().milestones
  const colorOffset = existing.length // new milestones continue from existing color index

  const addMilestone = () => {
    const name = input.trim()
    if (!name || milestones.length >= 5) return
    const colorKey = DOT_COLORS[(colorOffset + milestones.length) % DOT_COLORS.length].key
    setMilestones(prev => [...prev, { id: `ms_${Date.now()}`, name, colorKey }])
    setInput('')
  }

  const removeMilestone = (id) => setMilestones(prev => prev.filter(m => m.id !== id))

  const handleSave = () => {
    if (milestones.length === 0) return
    const data = loadData()
    data.milestones = [...data.milestones, ...milestones]
    saveData(data)
    window.dispatchEvent(new Event('milestones-updated'))
    onSave(milestones)
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter') { e.preventDefault(); addMilestone() } }

  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
      padding: '56px 24px 40px', zIndex: 200,
      animation: 'fadeIn 0.25s ease both',
    }}>
      {onClose && (
        <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: 24 }}>×</button>
      )}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 24, fontWeight: 300, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.4, letterSpacing: '-0.3px' }}>
          내 목표를 설정해봐요.
        </p>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>
          마일스톤을 추가하면 점과 함께 기록돼요.
        </p>

        {/* Input */}
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
              border: 'none', borderRadius: 9999,
              color: input.trim() && milestones.length < 5 ? '#ffffff' : '#a8a29e',
              fontFamily: 'inherit', fontSize: 20, width: 48,
              cursor: input.trim() && milestones.length < 5 ? 'pointer' : 'default',
              transition: 'all 0.15s', flexShrink: 0,
            }}
          >+</button>
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          {milestones.length === 0 && (
            <p style={{ fontSize: 13, color: 'var(--text-dim)', textAlign: 'center', marginTop: 20 }}>
              마일스톤을 추가해봐요.
            </p>
          )}
          {milestones.map(m => (
            <div key={m.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: '#ffffff',
              border: '1px solid #e7e5e4',
              borderRadius: 16, padding: '13px 16px',
              animation: 'fadeIn 0.25s ease both',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            }}>
              <GradientDot colorKey={m.colorKey} size={16} />
              <span style={{ flex: 1, fontSize: 15, color: 'var(--text-primary)', fontWeight: 500 }}>{m.name}</span>
              <button onClick={() => removeMilestone(m.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', fontSize: 18, lineHeight: 1, padding: '0 2px' }}>×</button>
            </div>
          ))}
        </div>
      </div>

      <button
        className="btn-main"
        onClick={handleSave}
        disabled={milestones.length === 0}
      >
        저장하기
      </button>
    </div>
  )
}
