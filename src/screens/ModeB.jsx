import { useState } from 'react'
import DotReveal from '../components/DotReveal'
import GradientDot from '../components/GradientDot'
import MilestoneSetup from '../components/MilestoneSetup'
import { addDot, loadData } from '../store'

const REFLECTION_OPTIONS = ['생각보다 쉬웠어요', '생각보다 어려웠어요', '오래 걸렸어요', '그냥 그랬어요']

const SEL_ON  = { borderColor: '#292524', background: 'rgba(41,37,36,0.07)' }
const SEL_OFF = { borderColor: '#e7e5e4', background: 'transparent' }

function suggestSteps(goal) {
  const presets = [
    [/(운동|헬스|달리기|걷기)/, ['운동복 입기', '밖으로 나가기', '10분 움직이기']],
    [/(논문|보고서|글)/, ['파일 열기', '첫 문장 쓰기', '한 단락 완성하기']],
    [/(공부|시험|학습)/, ['교재 펴기', '오늘 범위 확인', '첫 페이지 읽기']],
    [/(코딩|개발|프로젝트)/, ['에디터 열기', '할 일 한 줄 적기', '코드 한 줄 쓰기']],
  ]
  for (const [pattern, steps] of presets) {
    if (pattern.test(goal)) return steps
  }
  return [`'${goal}' 준비하기`, `${goal} — 일부 해보기`, `${goal} — 마무리`]
}

export default function ModeB({ onClose, onDone }) {
  const [milestones, setMilestones] = useState(() => loadData().milestones)
  const [showSetup, setShowSetup] = useState(false)

  const [step, setStep] = useState(1)
  const [goals, setGoals] = useState([])
  const [goalInput, setGoalInput] = useState('')
  const [selectedGoalIdx, setSelectedGoalIdx] = useState(null)
  const [selectedMilestone, setSelectedMilestone] = useState(null)

  const selectedGoal = selectedGoalIdx !== null ? goals[selectedGoalIdx] : ''

  const addGoal = () => {
    const g = goalInput.trim()
    if (!g) return
    setGoals(prev => {
      const next = [...prev, g]
      if (selectedGoalIdx === null) setSelectedGoalIdx(0)
      return next
    })
    setGoalInput('')
  }

  const removeGoal = (i) => {
    setGoals(prev => {
      const next = prev.filter((_, j) => j !== i)
      setSelectedGoalIdx(idx => {
        if (idx === i) return next.length > 0 ? 0 : null
        if (idx > i) return idx - 1
        return idx
      })
      return next
    })
  }
  const [steps, setSteps] = useState([])
  const [editingSteps, setEditingSteps] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState(0)
  const [reflection, setReflection] = useState('')
  const [note, setNote] = useState('')
  const [revealed, setRevealed] = useState(false)

  const goStep2 = () => { setSteps(suggestSteps(selectedGoal)); setStep(2) }

  const nextStep = () => {
    const next = currentStep + 1
    setCompletedSteps(next)
    if (next >= steps.length) setStep(4)
    else setCurrentStep(next)
  }

  const stopEarly = () => { setCompletedSteps(currentStep + 1); setStep(4) }

  const finish = () => {
    const label = selectedGoal + (completedSteps < steps.length ? ` · ${steps.length}단계 중 ${completedSteps}단계까지` : '')
    addDot({ milestoneId: selectedMilestone?.id, label, note, reflection })
    window.dispatchEvent(new Event('dots-updated'))
    setRevealed(true)
  }

  if (revealed) return <DotReveal milestone={selectedMilestone || milestones[0]} onDone={onDone} />

  if (showSetup) return (
    <MilestoneSetup
      onSave={() => { setMilestones(loadData().milestones); setShowSetup(false) }}
      onClose={() => setShowSetup(false)}
    />
  )

  const closeBtn = (
    <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: 24 }}>×</button>
  )

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--bg)', display: 'flex', flexDirection: 'column', padding: '56px 24px 40px', zIndex: 50 }}>
      {closeBtn}

      {/* STEP 1 */}
      {step === 1 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.3s ease both' }}>
          <p style={{ fontSize: 24, fontWeight: 300, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.4, letterSpacing: '-0.3px' }}>오늘 뭘 해볼 거예요?</p>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>여러 개 적고, 하나를 골라봐요.</p>

          {/* 할 일 목록 입력 */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <input
              value={goalInput}
              onChange={e => setGoalInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addGoal() } }}
              placeholder="운동하기, 보고서 1장 쓰기..."
              maxLength={24}
              autoFocus
              style={{
                flex: 1, background: '#ffffff',
                border: '1px solid #d6d3d1', borderRadius: 8,
                padding: '11px 14px', color: 'var(--text-primary)',
                fontSize: 15, fontFamily: 'inherit', outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = '#292524'}
              onBlur={e => e.target.style.borderColor = '#d6d3d1'}
            />
            <button
              onClick={addGoal}
              disabled={!goalInput.trim()}
              style={{
                background: goalInput.trim() ? '#292524' : '#f0efed',
                border: 'none', borderRadius: 9999, width: 44, flexShrink: 0,
                color: goalInput.trim() ? '#ffffff' : '#a8a29e',
                fontFamily: 'inherit', fontSize: 20,
                cursor: goalInput.trim() ? 'pointer' : 'default', transition: 'all 0.15s',
              }}
            >+</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {goals.length === 0 && (
              <p style={{ fontSize: 13, color: 'var(--text-dim)', textAlign: 'center', padding: '8px 0' }}>할 일을 추가해봐요.</p>
            )}
            {goals.map((g, i) => (
              <div
                key={i}
                onClick={() => setSelectedGoalIdx(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '11px 14px', borderRadius: 16, border: '1px solid',
                  ...(selectedGoalIdx === i ? SEL_ON : SEL_OFF),
                  cursor: 'pointer', transition: 'all 0.15s',
                  animation: 'fadeIn 0.2s ease both',
                }}
              >
                <span style={{ fontSize: 12, color: 'var(--text-dim)', minWidth: 18, fontWeight: 600 }}>{i + 1}</span>
                <span style={{ flex: 1, fontSize: 15, color: 'var(--text-primary)', fontWeight: selectedGoalIdx === i ? 600 : 400 }}>{g}</span>
                <button
                  onClick={e => { e.stopPropagation(); removeGoal(i) }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', fontSize: 18, lineHeight: 1, padding: '0 2px' }}
                >×</button>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>마일스톤</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 'auto' }}>
            {milestones.length === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '24px 0' }}>
                <p style={{ fontSize: 14, color: 'var(--text-dim)', textAlign: 'center' }}>아직 마일스톤이 없어요.</p>
                <button className="btn-secondary" onClick={() => setShowSetup(true)} style={{ padding: '10px 20px', fontSize: 14 }}>
                  내 목표 설정하기
                </button>
              </div>
            )}
            {milestones.map(m => (
              <button
                key={m.id}
                onClick={() => setSelectedMilestone(m)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 16px', borderRadius: 16, border: '1px solid',
                  ...(selectedMilestone?.id === m.id ? SEL_ON : SEL_OFF),
                  color: 'var(--text-primary)', fontFamily: 'inherit',
                  fontSize: 15, cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left',
                }}
              >
                <GradientDot colorKey={m.colorKey} size={14} />
                <span style={{ fontWeight: selectedMilestone?.id === m.id ? 600 : 400 }}>{m.name}</span>
              </button>
            ))}
          </div>

          <button className="btn-main" onClick={goStep2} disabled={selectedGoalIdx === null || !selectedMilestone} style={{ marginTop: 24 }}>
            다음 →
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.3s ease both' }}>
          <p style={{ fontSize: 24, fontWeight: 300, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.3px' }}>이렇게 나눠볼게요.</p>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28 }}>수정해도 괜찮아요.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 'auto' }}>
            {steps.map((s, i) => (
              <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 13, color: 'var(--text-dim)', minWidth: 28, fontWeight: 600 }}>{i + 1}단계</span>
                {editingSteps
                  ? <input value={s} onChange={e => setSteps(prev => prev.map((x, j) => j === i ? e.target.value : x))}
                      style={{ flex: 1, background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'inherit', outline: 'none' }} />
                  : <span style={{ fontSize: 15, color: 'var(--text-primary)' }}>{s}</span>
                }
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setEditingSteps(!editingSteps)}>
              {editingSteps ? '완료' : '수정할게요'}
            </button>
            <button className="btn-main" style={{ flex: 2 }} onClick={() => setStep(3)}>이대로 시작할게요</button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.3s ease both' }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 32 }}>
            {steps.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= currentStep ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.1)', transition: 'background 0.3s' }} />
            ))}
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 6 }}>{currentStep + 1}단계 / {steps.length}단계</p>
          <p style={{ fontSize: 26, fontWeight: 300, color: 'var(--text-primary)', marginBottom: 'auto', lineHeight: 1.4, letterSpacing: '-0.3px' }}>{steps[currentStep]}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button className="btn-main" onClick={nextStep}>
              {currentStep < steps.length - 1 ? '완료, 다음 단계로 →' : '모두 완료했어요'}
            </button>
            <button className="btn-ghost" onClick={stopEarly}>오늘은 여기까지</button>
          </div>
        </div>
      )}

      {/* STEP 4 — 회고 */}
      {step === 4 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.3s ease both', overflowY: 'auto' }}>
          <p style={{ fontSize: 24, fontWeight: 300, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.3px' }}>어땠어요?</p>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 28 }}>평가가 아니라 관찰이에요.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
            {REFLECTION_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => setReflection(opt)}
                className="btn-primary"
                style={{
                  border: `1px solid`,
                  ...(reflection === opt ? SEL_ON : SEL_OFF),
                  padding: '14px 16px',
                }}
              >
                {opt}
              </button>
            ))}
          </div>

          <p style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 10 }}>기억하고 싶은 게 있으면 적어요. (선택)</p>
          <textarea className="input-area" placeholder="" value={note} onChange={e => setNote(e.target.value)} rows={3} style={{ marginBottom: 24 }} />
          <button className="btn-main" onClick={finish} style={{ flexShrink: 0 }}>점 찍기 💧</button>
        </div>
      )}
    </div>
  )
}
