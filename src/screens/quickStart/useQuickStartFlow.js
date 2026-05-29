import { useState } from 'react'
import { addDot, loadData } from '../../store'
import { START_TEMPLATES, buildMinAction } from '../../modeFlow'

export default function useQuickStartFlow(onDone) {
  const [milestones, setMilestones] = useState(() => loadData().milestones)
  const [showSetup, setShowSetup] = useState(false)
  const [step, setStep] = useState(1)
  const [blockerText, setBlockerText] = useState('')
  const [selectedMilestone, setSelectedMilestone] = useState(null)
  const [selectedTemplateId, setSelectedTemplateId] = useState(null)
  const [minAction, setMinAction] = useState('')
  const [timerEnabled, setTimerEnabled] = useState(false)
  const [timerMinutes, setTimerMinutes] = useState(10)
  // completion fields
  const [completionRate, setCompletionRate] = useState(null)
  const [beforeAfterNote, setBeforeAfterNote] = useState('')
  const [encouragement, setEncouragement] = useState('')
  const [photo, setPhoto] = useState(null)
  const [revealed, setRevealed] = useState(false)

  const selectedTemplate = START_TEMPLATES.find(t => t.id === selectedTemplateId)

  const refreshMilestones = () => setMilestones(loadData().milestones)

  const goBack = () => setStep(s => Math.max(1, s - 1))

  const goToTemplateStep = () => setStep(2)

  const goToActionPlanStep = () => {
    const template = START_TEMPLATES.find(t => t.id === selectedTemplateId)
    if (!template) return
    setMinAction(buildMinAction(template, blockerText, selectedMilestone?.name))
    setTimerEnabled(template.id === 'timer')
    setTimerMinutes(template.defaultTimer ?? 10)
    setStep(3)
  }

  // 타이머 있으면 step4=timer → step5=completion, 없으면 step4=completion
  const completionStepNum = timerEnabled ? 5 : 4
  const goToCompletion = () => setStep(completionStepNum)

  const startCountdown = () => {
    if (timerEnabled) setStep(4)
    else goToCompletion()
  }

  const recordDot = () => {
    addDot({
      milestoneId: selectedMilestone?.id,
      label: minAction,
      completionRate,
      ...(beforeAfterNote && { beforeAfterNote }),
      ...(encouragement  && { encouragement }),
      ...(photo          && { photo }),
    })
    window.dispatchEvent(new Event('dots-updated'))
    setRevealed(true)
  }

  return {
    milestones,
    showSetup,
    setShowSetup,
    refreshMilestones,
    step,
    blockerText,
    setBlockerText,
    selectedMilestone,
    setSelectedMilestone,
    selectedTemplateId,
    setSelectedTemplateId,
    selectedTemplate,
    minAction,
    setMinAction,
    timerEnabled,
    setTimerEnabled,
    timerMinutes,
    setTimerMinutes,
    completionRate,
    setCompletionRate,
    beforeAfterNote,
    setBeforeAfterNote,
    encouragement,
    setEncouragement,
    photo,
    setPhoto,
    completionStepNum,
    goBack,
    goToTemplateStep,
    goToActionPlanStep,
    goToCompletion,
    startCountdown,
    recordDot,
    restDay: onDone,
  }
}
