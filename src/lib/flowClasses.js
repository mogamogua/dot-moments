import { cn } from './cn'

export const stepShell = 'flex min-h-0 flex-1 flex-col animate-[fadeIn_0.3s_ease_both]'
export const scrollBody = 'flex min-h-0 flex-1 flex-col overflow-y-auto'
export const stepTitle = 'mb-2 text-2xl font-semibold leading-snug tracking-tight text-ink'
export const stepSubtitle = 'mb-4 text-sm text-body'

export function selectableCard(active) {
  return cn(
    'flex w-full items-center gap-3 rounded-card border px-4 py-3 text-left font-inherit text-[15px] text-ink transition-all cursor-pointer',
    active ? 'border-accent bg-accent/10' : 'border-border bg-transparent',
  )
}

export function chipButton(active) {
  return cn(
    'w-full rounded-chip border px-3.5 py-3 text-left text-sm leading-snug text-ink transition-all cursor-pointer',
    active ? 'border-accent bg-accent/10' : 'border-border bg-surface',
  )
}

export function radioIndicator(active) {
  return cn(
    'mt-0.5 size-[18px] shrink-0 rounded-full border-2',
    active
      ? 'border-accent bg-accent shadow-[inset_0_0_0_3px_#f5f5f5]'
      : 'border-border-strong bg-transparent',
  )
}

export function timerOption(active) {
  return cn(
    'flex-1 rounded-[14px] border py-3.5 text-[15px] font-semibold font-inherit transition-all cursor-pointer',
    active ? 'border-accent bg-accent/10 text-ink' : 'border-border bg-transparent text-body',
  )
}

export function reflectionOption(active) {
  return cn(
    'rounded-card border px-4 py-3.5 text-left text-[15px] font-inherit text-ink transition-all cursor-pointer bg-transparent',
    active ? 'border-accent bg-accent/10' : 'border-border',
  )
}
