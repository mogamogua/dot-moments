import DotReveal from '../../components/DotReveal'
import MilestoneSetup from '../../components/MilestoneSetup'
import ModeShell from '../../components/flow/ModeShell'
import useStepByStepFlow from './useStepByStepFlow'
import GoalStep from './steps/GoalStep'
import StepsPlanStep from './steps/StepsPlanStep'
import StepsExecuteStep from './steps/StepsExecuteStep'
import ReflectionStep from './steps/ReflectionStep'

/** "해볼 수 있을 것 같아요" — 목표 → 단계 나누기 → 실행 → 회고 */
export default function StepByStepFlow({ onClose, onDone }) {
  const flow = useStepByStepFlow()

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

  const handleStepChange = (index, value) => {
    flow.setSteps(prev => prev.map((x, j) => (j === index ? value : x)))
  }

  return (
    <ModeShell step={flow.step} onClose={onClose}>
      {flow.step === 1 && (
        <GoalStep
          goalText={flow.goalText}
          onGoalChange={flow.setGoalText}
          milestones={flow.milestones}
          selectedMilestone={flow.selectedMilestone}
          onSelectMilestone={flow.setSelectedMilestone}
          onSetup={() => flow.setShowSetup(true)}
          onNext={flow.goToPlanStep}
          canProceed={!!flow.goalText.trim() && !!flow.selectedMilestone}
        />
      )}

      {flow.step === 2 && (
        <StepsPlanStep
          steps={flow.steps}
          editingSteps={flow.editingSteps}
          onToggleEdit={() => flow.setEditingSteps(!flow.editingSteps)}
          onStepChange={handleStepChange}
          onNext={flow.goToExecuteStep}
        />
      )}

      {flow.step === 3 && (
        <StepsExecuteStep
          steps={flow.steps}
          currentStep={flow.currentStep}
          onAdvance={flow.advanceStep}
          onStopEarly={flow.stopEarly}
        />
      )}

      {flow.step === 4 && (
        <ReflectionStep
          reflection={flow.reflection}
          onReflectionChange={flow.setReflection}
          note={flow.note}
          onNoteChange={flow.setNote}
          onFinish={flow.recordDot}
        />
      )}
    </ModeShell>
  )
}
