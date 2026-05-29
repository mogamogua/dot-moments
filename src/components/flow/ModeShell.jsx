import ModeProgress from '../ModeProgress'

export default function ModeShell({ step, totalSteps = 4, onClose, children }) {
  return (
    <div className="flow-overlay">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-5 z-10 text-2xl text-body"
        aria-label="닫기"
      >
        ×
      </button>
      <ModeProgress step={step} total={totalSteps} />
      {children}
    </div>
  )
}
