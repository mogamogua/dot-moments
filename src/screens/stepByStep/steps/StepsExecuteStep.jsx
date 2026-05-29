import { stepFooter, stepShell } from '../../../lib/flowClasses'

export default function StepsExecuteStep({ steps, currentStep, onAdvance, onStopEarly }) {
  const isLast = currentStep >= steps.length - 1

  return (
    <div className={stepShell}>
      <div className="mb-8 flex gap-1">
        {steps.map((_, i) => (
          <div
            key={i}
            className="h-[3px] flex-1 rounded-sm transition-colors"
            style={{ background: i <= currentStep ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.1)' }}
          />
        ))}
      </div>
      <p className="mb-1.5 text-[13px] text-dim">
        {currentStep + 1}단계 / {steps.length}단계
      </p>
      <p className="mb-auto text-[26px] font-light leading-snug tracking-tight text-ink">
        {steps[currentStep]}
      </p>
      <div className={stepFooter}>
        <button type="button" className="btn-main" onClick={onAdvance}>
          {isLast ? '모두 완료했어요' : '완료, 다음 단계로 →'}
        </button>
        <button type="button" className="btn-ghost" onClick={onStopEarly}>오늘은 여기까지</button>
      </div>
    </div>
  )
}
