import { useState } from 'react'
import { loadData, saveData } from './store'
import Onboarding from './screens/Onboarding'
import Home from './screens/Home'
import MyDots from './screens/MyDots'
import ModeA from './screens/ModeA'
import ModeB from './screens/ModeB'

const VIEWS = { HOME: 0, MY_DOTS: 1 }

export default function App() {
  const [data, setData] = useState(() => loadData())
  const [view, setView] = useState(VIEWS.HOME)
  const [modal, setModal] = useState(null) // 'modeA' | 'modeB'
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
    <div className="phone-frame" style={{ overflow: 'hidden' }}>
      {/* Sliding panel container */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex',
        transform: `translateX(${slideX}px)`,
        transition: 'transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
        width: '200%',
      }}>
        {/* Home panel */}
        <div style={{ width: '50%', height: '100%', position: 'relative', flexShrink: 0 }}>
          <Home
            onModeA={() => setModal('modeA')}
            onModeB={() => setModal('modeB')}
            onSwipeLeft={() => switchTo(VIEWS.MY_DOTS)}
          />
        </div>

        {/* MyDots panel */}
        <div style={{ width: '50%', height: '100%', position: 'relative', flexShrink: 0 }}>
          <MyDots onSwipeRight={() => switchTo(VIEWS.HOME)} />
        </div>
      </div>

      {/* Bottom nav dots */}
      <div style={{
        position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 6, zIndex: 10,
      }}>
        {[VIEWS.HOME, VIEWS.MY_DOTS].map(v => (
          <div
            key={v}
            onClick={() => switchTo(v)}
            style={{
              width: v === view ? 18 : 6, height: 6,
              borderRadius: 3,
              background: v === view ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.15)',
              transition: 'all 0.3s',
              cursor: v === view ? 'default' : 'pointer',
            }}
          />
        ))}
      </div>

      {/* Modals */}
      {modal === 'modeA' && (
        <ModeA
          onClose={() => setModal(null)}
          onDone={() => { setModal(null); setData(loadData()) }}
        />
      )}
      {modal === 'modeB' && (
        <ModeB
          onClose={() => setModal(null)}
          onDone={() => { setModal(null); setData(loadData()) }}
        />
      )}
    </div>
  )
}
