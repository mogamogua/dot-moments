import { useState } from 'react'
import DotReveal from '../components/DotReveal'
import GradientDot from '../components/GradientDot'
import MilestoneSetup from '../components/MilestoneSetup'
import { addDot, loadData } from '../store'

const MIN_ACTION_TEMPLATES = [
  [/(논문|리포트|report)/, '파일만 열어두기'],
  [/(운동|헬스|달리기|걷기)/, '운동복만 꺼내두기'],
  [/(메일|이메일|답장)/, '메일 창만 열어두기'],
  [/(공부|시험|학습|책)/, '책상에 앉아보기'],
  [/(청소|정리|설거지)/, '도구 하나만 꺼내두기'],
  [/(글|글쓰기|일기)/, '빈 문서 파일만 열기'],
  [/(코딩|개발|프로젝트)/, '에디터만 켜두기'],
]

function suggestMinAction(text) {
  for (const [pattern, action] of MIN_ACTION_TEMPLATES) {
    if (pattern.test(text)) return `'${text}' — ${action}`
  }
  return `'${text}' — 딱 1분만 시작해보기`
}

const TIMER_OPTIONS = [
  { label: '5분', value: 5 },
  { label: '10분', value: 10 },
  { label: '그냥 시작', value: null },
]

const SEL_ON  = { borderColor: '#292524', background: 'rgba(41,37,36,0.07)' }
const SEL_OFF = { borderColor: '#e7e5e4', background: 'transparent' }

export default function ModeA({ onClose, onDone }) {
  const [milestones, setMilestones] = useState(() => loadData().milestones)
  const [showSetup, setShowSetup] = useState(false)

  const [step, setStep] = useState(1)
  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState('')
  const [selectedTaskIdx, setSelectedTaskIdx] = useState(null)
  const [selectedMilestone, setSelectedMilestone] = useState(null)
  const [suggestion, setSuggestion] = useState('')

  const selectedTask = selectedTaskIdx !== null ? tasks[selectedTaskIdx] : ''

  const addTask = () => {
    const t = taskInput.trim()
    if (!t) return
    setTasks(prev => {
      const next = [...prev, t]
      if (selectedTaskIdx === null) setSelectedTaskIdx(0)
      return next
    })
    setTaskInput('')
  }

  const removeTask = (i) => {
    setTasks(prev => {
      const next = prev.filter((_, j) => j !== i)
      setSelectedTaskIdx(idx => {
        if (idx === i) return next.length > 0 ? 0 : null
        if (idx > i) return idx - 1
        return idx
      })
      return next
    })
  }
  const [timer, setTimer] = useState(undefined)
  const [timeLeft, setTimeLeft] = useState(null)
  const [timerRef, setTimerRef] = useState(null)
  const [revealed, setRevealed] = useState(false)

  const goStep2 = () => { setSuggestion(suggestMinAction(selectedTask)); setStep(2) }

  const startTimer = (mins) => {
    if (mins) {
      const secs = mins * 60
      setTimeLeft(secs)
      const id = setInterval(() => {
        setTimeLeft(prev => { if (prev <= 1) { clearInterval(id); return 0 } return prev - 1 })
      }, 1000)
      setTimerRef(id)
    }
    setTimeout(() => setStep(4), 400)
  }

  const finish = () => {
    if (timerRef) clearInterval(timerRef)
    addDot({ milestoneId: selectedMilestone?.id, label: suggestion })
    window.dispatchEvent(new Event('dots-updated'))
    setRevealed(true)
  }

  const restDay = () => {
    addDot({ milestoneId: selectedMilestone?.id || milestones[0]?.id, label: '쉬기로 했어요' })
    window.dispatchEvent(new Event('dots-updated'))
    onDone()
  }

  const fmt = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`

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
          <p style={{ fontSize: 24, fontWeight: 300, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.4, letterSpacing: '-0.3px' }}>지금 뭐가 걸려있어요?</p>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>여러 개 적고, 하나를 골라봐요.</p>

          {/* 할 일 목록 입력 */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <input
              value={taskInput}
              onChange={e => setTaskInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTask() } }}
              placeholder="논문, 운동, 메일 답장..."
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
              onClick={addTask}
              disabled={!taskInput.trim()}
              style={{
                background: taskInput.trim() ? '#292524' : '#f0efed',
                border: 'none', borderRadius: 9999, width: 44, flexShrink: 0,
                color: taskInput.trim() ? '#ffffff' : '#a8a29e',
                fontFamily: 'inherit', fontSize: 20,
                cursor: taskInput.trim() ? 'pointer' : 'default', transition: 'all 0.15s',
              }}
            >+</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {tasks.length === 0 && (
              <p style={{ fontSize: 13, color: 'var(--text-dim)', textAlign: 'center', padding: '8px 0' }}>할 일을 추가해봐요.</p>
            )}
            {tasks.map((task, i) => (
              <div
                key={i}
                onClick={() => setSelectedTaskIdx(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '11px 14px', borderRadius: 16, border: '1px solid',
                  ...(selectedTaskIdx === i ? SEL_ON : SEL_OFF),
                  cursor: 'pointer', transition: 'all 0.15s',
                  animation: 'fadeIn 0.2s ease both',
                }}
              >
                <span style={{ fontSize: 12, color: 'var(--text-dim)', minWidth: 18, fontWeight: 600 }}>{i + 1}</span>
                <span style={{ flex: 1, fontSize: 15, color: 'var(--text-primary)', fontWeight: selectedTaskIdx === i ? 600 : 400 }}>{task}</span>
                <button
                  onClick={e => { e.stopPropagation(); removeTask(i) }}
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

          <button className="btn-main" onClick={goStep2} disabled={selectedTaskIdx === null || !selectedMilestone} style={{ marginTop: 24 }}>
            다음 →
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.3s ease both' }}>
          <p style={{ fontSize: 24, fontWeight: 300, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.4, letterSpacing: '-0.3px' }}>그럼 오늘은<br />이것만 해볼까요?</p>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28 }}>완벽하지 않아도 괜찮아요.</p>

          <div className="card" style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <GradientDot colorKey={selectedMilestone?.colorKey} size={10} />
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{selectedMilestone?.name}</span>
            </div>
            <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5 }}>{suggestion}</p>
          </div>

          <button className="btn-secondary" style={{ width: '100%', textAlign: 'center', marginBottom: 'auto', padding: '12px' }}
            onClick={() => setSuggestion(`${selectedTask} — 딱 30초만 시작해보기`)}>
            더 작게 쪼개기
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
            <button className="btn-main" onClick={() => setStep(3)}>해볼게요</button>
            <button className="btn-ghost" onClick={restDay}>오늘은 그냥 쉴게요</button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.3s ease both' }}>
          <p style={{ fontSize: 24, fontWeight: 300, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.3px' }}>준비됐으면 시작해요.</p>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>타이머를 설정하면 더 가볍게 시작할 수 있어요.</p>

          <div style={{ display: 'flex', gap: 10, marginBottom: 'auto' }}>
            {TIMER_OPTIONS.map(opt => (
              <button
                key={opt.label}
                onClick={() => setTimer(opt.value)}
                style={{
                  flex: 1, padding: '16px 0', borderRadius: 14, border: '1px solid',
                  ...(timer === opt.value ? SEL_ON : SEL_OFF),
                  color: timer === opt.value ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontSize: 15, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <button className="btn-main" onClick={() => startTimer(timer)} disabled={timer === undefined}>
            시작하기
          </button>
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.3s ease both' }}>
          {timeLeft !== null && timeLeft > 0 ? (
            <>
              <p style={{ fontSize: 56, fontWeight: 300, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums', marginBottom: 8 }}>{fmt(timeLeft)}</p>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{suggestion}</p>
            </>
          ) : (
            <>
              <p style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8, textAlign: 'center' }}>{suggestion}</p>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>하고 있는 중이에요.</p>
            </>
          )}
          <button className="btn-main" onClick={finish} style={{ position: 'absolute', bottom: 40, left: 24, right: 24 }}>
            점 찍기 💧
          </button>
        </div>
      )}
    </div>
  )
}
