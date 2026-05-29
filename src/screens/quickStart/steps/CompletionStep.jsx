import { useRef } from 'react'
import { cn } from '../../../lib/cn'
import { scrollBody, stepFooter, stepShell, stepSubtitle, stepTitle } from '../../../lib/flowClasses'
import { resizeImage } from '../../../lib/resizeImage'

const COMPLETION_OPTIONS = [
  { value: 25,  label: '조금 했어요' },
  { value: 50,  label: '절반 정도' },
  { value: 75,  label: '거의 다' },
  { value: 100, label: '완료!' },
]

function FieldLabel({ text, optional = false }) {
  return (
    <div className="mb-2 flex items-center gap-1.5">
      <span className="text-[13px] font-medium text-ink">{text}</span>
      {optional && <span className="text-[11px] text-dim">선택</span>}
    </div>
  )
}

export default function CompletionStep({
  completionRate,
  onCompletionChange,
  beforeAfterNote,
  onBeforeAfterChange,
  encouragement,
  onEncouragementChange,
  photo,
  onPhotoChange,
  onFinish,
}) {
  const fileRef = useRef(null)

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const resized = await resizeImage(file)
      onPhotoChange(resized)
    } catch {
      // 이미지 처리 실패 시 원본 그대로 사용
      const reader = new FileReader()
      reader.onload = (ev) => onPhotoChange(ev.target.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={stepShell}>
      <div className={scrollBody}>
        <p className={stepTitle}>어느 정도 완료했나요?</p>
        <p className={stepSubtitle}>솔직하게 골라봐요. 조금도 충분해요.</p>

        {/* 완료율 — required */}
        <div className="mb-6 grid grid-cols-4 gap-2">
          {COMPLETION_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onCompletionChange(opt.value)}
              className={cn(
                'flex flex-col items-center gap-1 rounded-card border py-3.5 transition-all',
                completionRate === opt.value
                  ? 'border-accent bg-accent/10'
                  : 'border-border bg-transparent',
              )}
            >
              <span className="text-[15px] font-semibold text-ink">{opt.value}%</span>
              <span className="text-[11px] leading-tight text-body">{opt.label}</span>
            </button>
          ))}
        </div>

        {/* 감정·생각 변화 — optional */}
        <div className="mb-4">
          <FieldLabel text="하기 전·후 감정 변화" optional />
          <textarea
            className="input-area resize-none"
            value={beforeAfterNote}
            onChange={e => onBeforeAfterChange(e.target.value)}
            placeholder="하기 전에는 막막했는데, 시작하고 나니..."
            rows={3}
          />
        </div>

        {/* 격려의 한마디 — optional */}
        <div className="mb-4">
          <FieldLabel text="나에게 한마디" optional />
          <input
            type="text"
            className="input-area"
            style={{ minHeight: 'unset' }}
            value={encouragement}
            onChange={e => onEncouragementChange(e.target.value)}
            placeholder="오늘도 한 걸음 나아갔어요."
          />
        </div>

        {/* 사진 — optional */}
        <div className="mb-2">
          <FieldLabel text="사진" optional />
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
          {photo ? (
            <div className="relative overflow-hidden rounded-card">
              <img
                src={photo}
                alt="완료 인증"
                className="w-full object-cover"
                style={{ maxHeight: 200 }}
              />
              <button
                type="button"
                onClick={() => { onPhotoChange(null); if (fileRef.current) fileRef.current.value = '' }}
                className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/50 text-[16px] leading-none text-white"
              >
                ×
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className={cn(
                'flex w-full items-center justify-center gap-2 rounded-card border border-dashed py-5',
                'border-border-strong text-[14px] text-dim transition-colors',
                'hover:border-accent hover:text-ink',
              )}
            >
              <span>📷</span>
              <span>사진 추가하기</span>
            </button>
          )}
        </div>
      </div>

      <div className={stepFooter}>
        <button
          type="button"
          className="btn-main"
          onClick={onFinish}
          disabled={!completionRate}
        >
          점 찍기 💧
        </button>
      </div>
    </div>
  )
}
