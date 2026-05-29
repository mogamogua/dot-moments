import { useState } from 'react'
import { addDot, loadData } from '../../store'
import { START_TEMPLATES, buildMinAction } from '../../modeFlow'

export default function useStepByStepFlow(onDone) {
  const [milestones, setMilestones] = useState(() => loadData().milestones)
  const [showSetup, setShowSetup] = useState(false)
  const [step, setStep] = useState(1)
  const [goalText, setGoalText] = useState('')
  const [selectedMilestone, setSelectedMilestone] = useState(null)
  const [selectedTemplateId, setSelectedTemplateId] = useState(null)
  const [minAction, setMinAction] = useState('')
  const [timerMinutes, setTimerMinutes] = useState(10)
  const [revealed, setRevealed] = useState(false)

  const selectedTemplate = START_TEMPLATES.find(t => t.id === selectedTemplateId)

  const refreshMilestones = () => setMilestones(loadData().milestones)

  const goBack = () => setStep(s => Math.max(1, s - 1))

  const goToTemplateStep = () => setStep(2)

  const goToActionPlanStep = () => {
    const template = START_TEMPLATES.find(t => t.id === selectedTemplateId)
    if (!template) return
    setMinAction(buildMinAction(template, goalText, selectedMilestone?.name))
    setTimerMinutes(template.defaultTimer ?? 10)
    setStep(3)
  }

  const recordDot = () => {
    addDot({ milestoneId: selectedMilestone?.id, label: minAction })
    window.dispatchEvent(new Event('dots-updated'))
    setRevealed(true)
  }

  const startCountdown = () => {
    if (selectedTemplate?.id === 'timer') setStep(4)
    else recordDot()
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
    selectedTemplateId,
    setSelectedTemplateId,
    selectedTemplate,
    minAction,
    setMinAction,
    timerMinutes,
    setTimerMinutes,
    revealed,
    goBack,
    goToTemplateStep,
    goToActionPlanStep,
    startCountdown,
    recordDot,
    restDay: onDone,
  }
}
