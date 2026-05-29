import { cn } from './cn'

export const stepShell = 'flow-step'
export const scrollBody = 'flow-scroll'
export const stepTitle = 'flow-title'
export const stepSubtitle = 'flow-subtitle'
export const stepFooter = 'flow-footer'

export function selectableCard(active) {
  return cn(
    'flex w-full cursor-pointer items-center gap-3 rounded-card border px-4 py-3 text-left text-[15px] text-ink transition-all',
    active ? 'border-accent bg-accent/10' : 'border-border bg-transparent',
  )
}

export function chipButton(active) {
  return cn(
    'w-full cursor-pointer rounded-chip border px-3.5 py-3 text-left text-sm leading-snug text-ink transition-all',
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
    'flex-1 cursor-pointer rounded-[14px] border py-3.5 text-[15px] font-semibold transition-all',
    active ? 'border-accent bg-accent/10 text-ink' : 'border-border bg-transparent text-body',
  )
}

export function reflectionOption(active) {
  return cn(
    'cursor-pointer rounded-card border bg-transparent px-4 py-3.5 text-left text-[15px] text-ink transition-all',
    active ? 'border-accent bg-accent/10' : 'border-border',
  )
}
