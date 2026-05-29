import { reflectionOption, stepShell, stepSubtitle, stepTitle } from '../../../lib/flowClasses'
import { cn } from '../../../lib/cn'

const REFLECTION_OPTIONS = ['생각보다 쉬웠어요', '생각보다 어려웠어요', '오래 걸렸어요', '그냥 그랬어요']

export default function ReflectionStep({ reflection, onReflectionChange, note, onNoteChange, onFinish }) {
  return (
    <div className={cn(stepShell, 'overflow-y-auto')}>
      <p className={cn(stepTitle, 'mb-2')}>어땠어요?</p>
      <p className={cn(stepSubtitle, 'mb-7')}>평가가 아니라 관찰이에요.</p>

      <div className="mb-7 flex flex-col gap-2">
        {REFLECTION_OPTIONS.map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => onReflectionChange(opt)}
            className={reflectionOption(reflection === opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      <p className="mb-2.5 text-[13px] text-dim">기억하고 싶은 게 있으면 적어요. (선택)</p>
      <textarea
        className="input-area mb-6"
        placeholder=""
        value={note}
        onChange={e => onNoteChange(e.target.value)}
        rows={3}
      />
      <button type="button" className="btn-main shrink-0" onClick={onFinish}>점 찍기 💧</button>
    </div>
  )
}
