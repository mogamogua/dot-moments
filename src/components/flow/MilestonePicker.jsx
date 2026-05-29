import GradientDot from '../GradientDot'
import { selectableCard } from '../../lib/flowClasses'
import { cn } from '../../lib/cn'

export default function MilestonePicker({ milestones, selected, onSelect, onSetup }) {
  return (
    <>
      <p className="mb-2.5 text-xs font-medium tracking-wide text-dim">마일스톤</p>
      <div className="flex flex-col gap-2 pb-2">
        {milestones.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-4">
            <p className="text-center text-sm text-dim">아직 마일스톤이 없어요.</p>
            <button type="button" className="btn-secondary px-5 py-2.5 text-sm" onClick={onSetup}>
              내 목표 설정하기
            </button>
          </div>
        )}
        {milestones.map(m => (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m)}
            className={selectableCard(selected?.id === m.id)}
          >
            <GradientDot colorKey={m.colorKey} size={14} />
            <span className={cn('font-normal', selected?.id === m.id && 'font-semibold')}>{m.name}</span>
          </button>
        ))}
      </div>
    </>
  )
}
