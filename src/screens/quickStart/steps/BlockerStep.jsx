import MilestonePicker from '../../../components/flow/MilestonePicker'
import SuggestionChips from '../../../components/flow/SuggestionChips'
import { BLOCKER_SUGGESTIONS } from '../../../modeFlow'
import { scrollBody, stepShell, stepSubtitle, stepTitle } from '../../../lib/flowClasses'

export default function BlockerStep({
  blockerText,
  onBlockerChange,
  milestones,
  selectedMilestone,
  onSelectMilestone,
  onSetup,
  onNext,
  canProceed,
}) {
  return (
    <div className={stepShell}>
      <div className={scrollBody}>
        <p className={stepTitle}>
          어떤 것들이 시작을<br />가로막고 있나요?
        </p>
        <p className={stepSubtitle}>직접 입력하거나 예시를 선택하세요.</p>

        <textarea
          className="input-area mb-3 resize-none"
          value={blockerText}
          onChange={e => onBlockerChange(e.target.value)}
          placeholder="지금 마음에 드는 대로 적어봐요."
          rows={4}
          autoFocus
        />

        <SuggestionChips
          suggestions={BLOCKER_SUGGESTIONS}
          value={blockerText}
          onSelect={onBlockerChange}
        />

        <MilestonePicker
          milestones={milestones}
          selected={selectedMilestone}
          onSelect={onSelectMilestone}
          onSetup={onSetup}
        />
      </div>

      <button type="button" className="btn-main mt-4 shrink-0" onClick={onNext} disabled={!canProceed}>
        다음
      </button>
    </div>
  )
}
