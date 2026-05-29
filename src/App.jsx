import { useState } from 'react'
import { loadData, saveData } from './store'
import Onboarding from './screens/Onboarding'
import Home from './screens/Home'
import MyDots from './screens/MyDots'
import QuickStartFlow from './screens/quickStart/QuickStartFlow'
import StepByStepFlow from './screens/stepByStep/StepByStepFlow'
import { cn } from './lib/cn'

const VIEWS = { HOME: 0, MY_DOTS: 1 }

export default function App() {
  const [data, setData] = useState(() => loadData())
  const [view, setView] = useState(VIEWS.HOME)
  const [modal, setModal] = useState(null) // 'quickStart' | 'stepByStep'
  const [slideX, setSlideX] = useState(0)

  const markOnboarded = (milestones) => {
    const updated = { ...data, onboardingDone: true, milestones }
    saveData(updated)
    setData(updated)
  }

  const switchTo = (v) => {
    setSlideX(v === VIEWS.HOME ? 0 : -390)
    setView(v)
  }

  if (!data.onboardingDone) {
    return (
      <div className="phone-frame">
        <Onboarding onDone={markOnboarded} />
      </div>
    )
  }

  return (
    <div className="phone-frame overflow-hidden">
      <div
        className="absolute inset-0 flex w-[200%] transition-transform duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={{ transform: `translateX(${slideX}px)` }}
      >
        <div className="relative h-full w-1/2 shrink-0">
          <Home
            onQuickStart={() => setModal('quickStart')}
            onStepByStep={() => setModal('stepByStep')}
            onSwipeLeft={() => switchTo(VIEWS.MY_DOTS)}
          />
        </div>

        <div className="relative h-full w-1/2 shrink-0">
          <MyDots onSwipeRight={() => switchTo(VIEWS.HOME)} />
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {[VIEWS.HOME, VIEWS.MY_DOTS].map(v => (
          <div
            key={v}
            role="button"
            tabIndex={0}
            onClick={() => switchTo(v)}
            onKeyDown={e => e.key === 'Enter' && switchTo(v)}
            className={cn(
              'h-1.5 rounded-sm transition-all',
              v === view ? 'w-[18px] cursor-default bg-black/55' : 'w-1.5 cursor-pointer bg-black/15',
            )}
          />
        ))}
      </div>

      {modal === 'quickStart' && (
        <QuickStartFlow
          onClose={() => setModal(null)}
          onDone={() => { setModal(null); setData(loadData()) }}
        />
      )}
      {modal === 'stepByStep' && (
        <StepByStepFlow
          onClose={() => setModal(null)}
          onDone={() => { setModal(null); setData(loadData()) }}
        />
      )}
    </div>
  )
}
