import { useState } from 'react'
import { addDot, loadData } from '../../store'
import { suggestSteps } from '../../lib/suggestSteps'

export default function useStepByStepFlow() {
  const [milestones, setMilestones] = useState(() => loadData().milestones)
  const [showSetup, setShowSetup] = useState(false)
  const [step, setStep] = useState(1)
  const [goalText, setGoalText] = useState('')
  const [selectedMilestone, setSelectedMilestone] = useState(null)
  const [steps, setSteps] = useState([])
  const [editingSteps, setEditingSteps] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState(0)
  const [reflection, setReflection] = useState('')
  const [note, setNote] = useState('')
  const [revealed, setRevealed] = useState(false)

  const refreshMilestones = () => setMilestones(loadData().milestones)

  const goToPlanStep = () => {
    setSteps(suggestSteps(goalText.trim()))
    setStep(2)
  }

  const goToExecuteStep = () => setStep(3)

  const advanceStep = () => {
    const next = currentStep + 1
    setCompletedSteps(next)
    if (next >= steps.length) setStep(4)
    else setCurrentStep(next)
  }

  const stopEarly = () => {
    setCompletedSteps(currentStep + 1)
    setStep(4)
  }

  const recordDot = () => {
    const label = goalText.trim() + (
      completedSteps < steps.length
        ? ` · ${steps.length}단계 중 ${completedSteps}단계까지`
        : ''
    )
    addDot({ milestoneId: selectedMilestone?.id, label, note, reflection })
    window.dispatchEvent(new Event('dots-updated'))
    setRevealed(true)
  }

  return {
    milestones,
    showSetup,
    setShowSetup,
    refreshMilestones,
    step,
    goalText,
    setGoalText,
    selectedMilestone,
    setSelectedMilestone,
    steps,
    setSteps,
    editingSteps,
    setEditingSteps,
    currentStep,
    completedSteps,
    reflection,
    setReflection,
    note,
    setNote,
    revealed,
    goToPlanStep,
    goToExecuteStep,
    advanceStep,
    stopEarly,
    recordDot,
  }
}
