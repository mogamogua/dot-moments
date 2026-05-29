import { TimerDisplay } from '../../../components/Timer'
import { cn } from '../../../lib/cn'
import { scrollBody, stepFooter, stepShell, stepSubtitle, stepTitle, timerOption } from '../../../lib/flowClasses'

const TIMER_OPTIONS = [
  { label: '10분', value: 10 },
  { label: '15분', value: 15 },
  { label: '30분', value: 30 },
]

export default function ActionPlanStep({
  template,
  minAction,
  onMinActionChange,
  timerMinutes,
  onTimerChange,
  onStart,
  onRestDay,
}) {
  if (!template) return null

  return (
    <div className={stepShell}>
      <div className={scrollBody}>
        <p className={stepTitle}>
          {template.step3Title || '선택한 시작점에서 어떤 것을 할까요?'}
        </p>
        <p className={cn(stepSubtitle, '!mb-5')}>오늘 할 일을 가볍게 적어봐요.</p>

        <div className="card mb-4">
          <div className="flex items-start gap-2.5">
            <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-accent" />
            <div className="min-w-0 flex-1">
              <p className="mb-2.5 text-[15px] font-semibold text-ink">{template.title}</p>
              <textarea
                className="input-area input-area--compact resize-none"
                value={minAction}
                onChange={e => onMinActionChange(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </div>

        <p className="mb-2.5 text-[13px] font-medium text-dim">타이머</p>
        <div className="mb-6 flex gap-2.5">
          {TIMER_OPTIONS.map(opt => (
            <button
              key={opt.label}
              type="button"
              onClick={() => onTimerChange(opt.value)}
              className={timerOption(timerMinutes === opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <TimerDisplay seconds={timerMinutes * 60} size="md" />
      </div>

      <div className={stepFooter}>
        <button type="button" className="btn-main" onClick={onStart} disabled={!minAction.trim()}>
          시작
        </button>
        <button type="button" className="btn-ghost" onClick={onRestDay}>오늘은 그냥 쉴게요</button>
      </div>
    </div>
  )
}
