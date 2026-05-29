import MilestonePicker from '../../../components/flow/MilestonePicker'
import SuggestionChips from '../../../components/flow/SuggestionChips'
import { GOAL_SUGGESTIONS } from '../../../modeFlow'
import { scrollBody, stepFooter, stepShell, stepSubtitle, stepTitle } from '../../../lib/flowClasses'

export default function GoalStep({
  goalText,
  onGoalChange,
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
        <p className={stepTitle}>오늘 뭘 해볼 거예요?</p>
        <p className={stepSubtitle}>직접 입력하거나 예시를 선택하세요.</p>

        <textarea
          className="input-area mb-3 resize-none"
          value={goalText}
          onChange={e => onGoalChange(e.target.value)}
          placeholder="크게 써도, 작게 써도 괜찮아요."
          rows={4}
          autoFocus
        />

        <SuggestionChips
          suggestions={GOAL_SUGGESTIONS}
          value={goalText}
          onSelect={onGoalChange}
        />

        <MilestonePicker
          milestones={milestones}
          selected={selectedMilestone}
          onSelect={onSelectMilestone}
          onSetup={onSetup}
        />
      </div>

      <div className={stepFooter}>
        <button type="button" className="btn-main" onClick={onNext} disabled={!canProceed}>
          다음
        </button>
      </div>
    </div>
  )
}
