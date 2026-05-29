import { useEffect, useRef, useState } from 'react'
import { cn } from '../lib/cn'

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export function TimerDisplay({ seconds, size = 'md' }) {
  return (
    <div
      className={cn(
        'mx-auto mb-6 flex items-center justify-center rounded-full bg-surface',
        size === 'lg' ? 'h-[180px] w-[180px]' : 'h-40 w-40',
      )}
    >
      <span
        className={cn(
          'font-light tabular-nums text-ink',
          size === 'lg' ? 'text-5xl' : 'text-4xl',
        )}
      >
        {formatTime(seconds)}
      </span>
    </div>
  )
}

/** Countdown timer: calls onComplete at 0, onAbandon when user gives up (no dot). */
export default function Timer({ durationMinutes, label, onComplete, onAbandon }) {
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60)
  const finishedRef = useRef(false)

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(prev => (prev <= 1 ? 0 : prev - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (timeLeft !== 0 || finishedRef.current) return
    finishedRef.current = true
    onComplete()
  }, [timeLeft, onComplete])

  const handleAbandon = () => {
    if (finishedRef.current) return
    finishedRef.current = true
    onAbandon()
  }

  if (timeLeft <= 0) return null

  return (
    <div className="flow-step relative">
      <div className="flex flex-1 flex-col items-center justify-center">
        <TimerDisplay seconds={timeLeft} size="lg" />
        <p className="px-4 text-center text-[15px] leading-relaxed text-body">{label}</p>
      </div>
      <div className="flow-footer">
        <button type="button" className="btn-ghost" onClick={handleAbandon}>
          포기하기
        </button>
      </div>
    </div>
  )
}
