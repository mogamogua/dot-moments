import DotReveal from '../../components/DotReveal'
import MilestoneSetup from '../../components/MilestoneSetup'
import ModeShell from '../../components/flow/ModeShell'
import Timer from '../../components/Timer'
import useStepByStepFlow from './useStepByStepFlow'
import GoalStep from './steps/GoalStep'
import StartTemplateStep from '../quickStart/steps/StartTemplateStep'
import ActionPlanStep from '../quickStart/steps/ActionPlanStep'

/** "해볼 수 있을 것 같아요" — 오늘의 할 일 → 시작 전략 선택 → 행동 계획 → 타이머 */
export default function StepByStepFlow({ onClose, onDone }) {
  const flow = useStepByStepFlow(onDone)

  if (flow.revealed) {
    return <DotReveal milestone={flow.selectedMilestone || flow.milestones[0]} onDone={onDone} />
  }

  if (flow.showSetup) {
    return (
      <MilestoneSetup
        onSave={() => { flow.refreshMilestones(); flow.setShowSetup(false) }}
        onClose={() => flow.setShowSetup(false)}
      />
    )
  }

  const totalSteps = flow.selectedTemplate?.id === 'timer' ? 4 : 3

  return (
    <ModeShell
      step={flow.step}
      totalSteps={totalSteps}
      onClose={onClose}
      onBack={flow.step > 1 && flow.step < 4 ? flow.goBack : undefined}
    >
      {flow.step === 1 && (
        <GoalStep
          goalText={flow.goalText}
          onGoalChange={flow.setGoalText}
          milestones={flow.milestones}
          selectedMilestone={flow.selectedMilestone}
          onSelectMilestone={flow.setSelectedMilestone}
          onSetup={() => flow.setShowSetup(true)}
          onNext={flow.goToTemplateStep}
          canProceed={!!flow.goalText.trim() && !!flow.selectedMilestone}
        />
      )}

      {flow.step === 2 && (
        <StartTemplateStep
          selectedTemplateId={flow.selectedTemplateId}
          onSelect={flow.setSelectedTemplateId}
          onNext={flow.goToActionPlanStep}
          canProceed={!!flow.selectedTemplateId}
        />
      )}

      {flow.step === 3 && (
        <ActionPlanStep
          template={flow.selectedTemplate}
          minAction={flow.minAction}
          onMinActionChange={flow.setMinAction}
          timerMinutes={flow.timerMinutes}
          onTimerChange={flow.setTimerMinutes}
          onStart={flow.startCountdown}
          onRestDay={flow.restDay}
        />
      )}

      {flow.step === 4 && (
        <Timer
          durationMinutes={flow.timerMinutes}
          label={flow.minAction}
          onComplete={flow.recordDot}
          onAbandon={onDone}
        />
      )}
    </ModeShell>
  )
}
