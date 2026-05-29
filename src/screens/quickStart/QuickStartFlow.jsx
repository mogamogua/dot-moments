import DotReveal from '../../components/DotReveal'
import MilestoneSetup from '../../components/MilestoneSetup'
import ModeShell from '../../components/flow/ModeShell'
import Timer from '../../components/Timer'
import useQuickStartFlow from './useQuickStartFlow'
import BlockerStep from './steps/BlockerStep'
import StartTemplateStep from './steps/StartTemplateStep'
import ActionPlanStep from './steps/ActionPlanStep'

/** "시작하기 어려워요" — 장벽 파악 → 시작 전략 → 타이머로 최소 행동 */
export default function QuickStartFlow({ onClose, onDone }) {
  const flow = useQuickStartFlow(onDone)

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
        <BlockerStep
          blockerText={flow.blockerText}
          onBlockerChange={flow.setBlockerText}
          milestones={flow.milestones}
          selectedMilestone={flow.selectedMilestone}
          onSelectMilestone={flow.setSelectedMilestone}
          onSetup={() => flow.setShowSetup(true)}
          onNext={flow.goToTemplateStep}
          canProceed={!!flow.blockerText.trim() && !!flow.selectedMilestone}
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
