import { START_TEMPLATES } from '../../../modeFlow'
import { cn } from '../../../lib/cn'
import { radioIndicator, scrollBody, stepFooter, stepShell, stepSubtitle, stepTitle } from '../../../lib/flowClasses'

export default function StartTemplateStep({ selectedTemplateId, onSelect, onNext, canProceed }) {
  return (
    <div className={stepShell}>
      <div className={scrollBody}>
        <p className={stepTitle}>
          오늘은 여기서부터<br />생각해볼까요?
        </p>
        <p className={cn(stepSubtitle, '!mb-5')}>다음과 같은 목표를 세워봐요.</p>

        <div className="flex flex-col gap-2.5 pb-2">
          {START_TEMPLATES.map(t => {
            const active = selectedTemplateId === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelect(t.id)}
                className={cn(
                  'flex w-full cursor-pointer items-start gap-3 rounded-card border p-4 text-left transition-all',
                  active ? 'border-accent bg-accent/10' : 'border-border bg-transparent',
                )}
              >
                <span className={radioIndicator(active)} />
                <div>
                  <p className="mb-1 text-[15px] font-semibold leading-snug text-ink">{t.title}</p>
                  <p className="text-[13px] leading-snug text-body">{t.desc}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className={stepFooter}>
        <button type="button" className="btn-main" onClick={onNext} disabled={!canProceed}>
          다음
        </button>
      </div>
    </div>
  )
}
