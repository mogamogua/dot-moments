import ModeProgress from '../ModeProgress'

export default function ModeShell({ step, totalSteps = 4, onClose, children }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-bg px-6 pb-10 pt-14">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-5 z-10 border-0 bg-transparent text-2xl text-body cursor-pointer"
      >
        ×
      </button>
      <ModeProgress step={step} total={totalSteps} />
      {children}
    </div>
  )
}
