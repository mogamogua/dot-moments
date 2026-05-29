import { cn } from '../../../lib/cn'
import { scrollBody, stepFooter, stepShell, stepSubtitle, stepTitle } from '../../../lib/flowClasses'

export default function StepsPlanStep({ steps, editingSteps, onToggleEdit, onStepChange, onNext }) {
  return (
    <div className={stepShell}>
      <div className={scrollBody}>
        <p className={cn(stepTitle, '!mb-2')}>이렇게 나눠볼게요.</p>
        <p className={cn(stepSubtitle, '!mb-6')}>수정해도 괜찮아요.</p>

        <div className="flex flex-col gap-2.5 pb-2">
          {steps.map((s, i) => (
            <div key={i} className="card flex items-center gap-3">
              <span className="min-w-7 text-[13px] font-semibold text-dim">{i + 1}단계</span>
              {editingSteps
                ? (
                  <input
                    value={s}
                    onChange={e => onStepChange(i, e.target.value)}
                    className="min-w-0 flex-1 border-0 bg-transparent text-[15px] text-ink outline-none"
                  />
                )
                : <span className="text-[15px] text-ink">{s}</span>
              }
            </div>
          ))}
        </div>
      </div>

      <div className={cn(stepFooter, 'flow-footer--row')}>
        <button type="button" className="btn-secondary" onClick={onToggleEdit}>
          {editingSteps ? '완료' : '수정할게요'}
        </button>
        <button type="button" className="btn-main" onClick={onNext}>이대로 시작할게요</button>
      </div>
    </div>
  )
}
