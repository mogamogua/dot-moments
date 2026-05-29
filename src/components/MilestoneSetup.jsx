import { useState } from 'react'
import GradientDot from './GradientDot'
import { DOT_COLORS, loadData, saveData } from '../store'
import { stepFooter } from '../lib/flowClasses'

export default function MilestoneSetup({ onSave, onClose, initialMilestones = [] }) {
  const [milestones, setMilestones] = useState(initialMilestones)
  const [input, setInput] = useState('')

  const existing = loadData().milestones
  const colorOffset = existing.length

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

  const canAdd = input.trim() && milestones.length < 5

  return (
    <div className="flow-overlay z-[200] animate-[fadeIn_0.25s_ease_both]">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-5 z-10 text-2xl text-body"
          aria-label="닫기"
        >
          ×
        </button>
      )}

      <div className="flow-step">
        <div className="flow-scroll">
          <p className="flow-title !font-light">내 목표를 설정해봐요.</p>
          <p className="flow-subtitle !mb-8">마일스톤을 추가하면 점과 함께 기록돼요.</p>

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
            <button type="button" className="btn-add" onClick={addMilestone} disabled={!canAdd}>+</button>
          </div>

          <div className="flex flex-col gap-2.5">
            {milestones.length === 0 && (
              <p className="mt-5 text-center text-[13px] text-dim">마일스톤을 추가해봐요.</p>
            )}
            {milestones.map(m => (
              <div key={m.id} className="milestone-row">
                <GradientDot colorKey={m.colorKey} size={16} />
                <span className="flex-1 text-[15px] font-medium text-ink">{m.name}</span>
                <button
                  type="button"
                  onClick={() => removeMilestone(m.id)}
                  className="px-0.5 text-lg leading-none text-dim"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={stepFooter}>
          <button type="button" className="btn-main" onClick={handleSave} disabled={milestones.length === 0}>
            저장하기
          </button>
        </div>
      </div>
    </div>
  )
}
