import { TimerDisplay } from '../../../components/Timer'
import { cn } from '../../../lib/cn'
import { checkIndicator, scrollBody, stepFooter, stepShell, stepSubtitle, stepTitle, timerOption } from '../../../lib/flowClasses'

const TIMER_OPTIONS = [
  { label: '10분', value: 10 },
  { label: '15분', value: 15 },
  { label: '30분', value: 30 },
]

export default function ActionPlanStep({
  template,
  minAction,
  onMinActionChange,
  timerEnabled,
  onTimerToggle,
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

        <div className="card mb-5">
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

        {/* Timer toggle */}
        <button
          type="button"
          onClick={onTimerToggle}
          className={cn(
            'mb-4 flex w-full items-center gap-3 rounded-card border px-4 py-3 text-left transition-all',
            timerEnabled ? 'border-accent bg-accent/10' : 'border-border bg-transparent',
          )}
        >
          <span className={checkIndicator(timerEnabled)}>
            {timerEnabled && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4l2.5 2.5L9 1" stroke="#f5f5f5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          <span className="text-[15px] text-ink">타이머 사용하기</span>
        </button>

        {/* Timer options — visible when enabled */}
        {timerEnabled && (
          <div className="animate-[fadeIn_0.2s_ease_both]">
            <div className="mb-4 flex gap-2.5">
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
        )}
      </div>

      <div className={stepFooter}>
        <button type="button" className="btn-main" onClick={onStart} disabled={!minAction.trim()}>
          {timerEnabled ? '타이머 시작' : '점 찍기'}
        </button>
        <button type="button" className="btn-ghost" onClick={onRestDay}>오늘은 그냥 쉴게요</button>
      </div>
    </div>
  )
}
