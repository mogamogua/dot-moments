import ModeProgress from '../ModeProgress'

export default function ModeShell({ step, totalSteps = 4, onClose, onBack, children }) {
  return (
    <div className="flow-overlay">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="absolute left-6 top-5 z-10 text-2xl text-body"
          aria-label="이전 단계"
        >
          ←
        </button>
      )}
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
