# Product Requirements Document: dot-moments

## Overview

**dot-moments** is a mindfulness practice app for perfectionist people who struggle to start actions. The core philosophy: starting is enough. Completion is secondary.

**Target User**: People who procrastinate due to perfectionism; those who want to build habits but feel paralyzed by the scale of tasks.

---

## Core Concept

### The Problem

Perfectionist users often can't start because:
- They're waiting for the "right time"
- They worry they won't do it "perfectly"
- The task feels too big or overwhelming
- They lack external accountability

### The Solution

**The Dot**: Each time you start (anything, no matter how small), a dot is placed. Over time, dots accumulate into a visual record of "showing up."

Key insight: **Starting ≠ Completing**. You can start a task and stop after 1 minute. That still counts.

---

## User Flows

### 1. Onboarding

**Goal**: Set up personal milestones (goals/areas of focus).

Steps:
1. Intro slides (3 screens) showing dot concept
2. Create milestones (up to 5) — e.g., "논문", "운동", "창의력"
3. Option to skip and set up later

**Edge case**: User can skip milestone setup entirely. If no milestones exist when launching Mode A/B, show "내 목표 설정하기" button.

---

### 2. Mode A: "Minimum Action" (Quick Start)

**Goal**: Overcome inertia by committing to the absolute minimum.

Steps:

1. **Enter what's weighing on you** (or multiple items)
   - Text input: "지금 뭐가 걸려있어요?"
   - Can enter multiple items (1, 2, 3...)
   - Select one item + milestone to work on

2. **See minimum action suggestion**
   - AI suggests smallest possible first step
   - Examples: "Open file only", "Put on workout clothes", "Sit at desk"
   - User can "더 작게 쪼개기" (break even smaller)

3. **Optional timer**
   - 5 min / 10 min / No timer
   - Timer displays while user is "doing"

4. **Mark as done**
   - "점 찍기" button records the dot
   - Dot reveal animation plays

**Key insight**: User doesn't need to complete anything. Just start.

---

### 3. Mode B: "Step-by-Step" (Structured Goals)

**Goal**: For bigger projects, break into manageable sub-steps.

Steps:

1. **Enter goal** (or multiple goals)
   - Text input: "오늘 뭘 해볼 거예요?"
   - Can enter multiple items
   - Select one + milestone

2. **See suggested sub-steps**
   - AI suggests 3 steps based on goal type
   - Example for "write report": "Open file" → "Write first sentence" → "Complete paragraph"
   - User can edit steps

3. **Work through steps**
   - Progress bar shows which step
   - User completes each step
   - Option to stop early ("오늘은 여기까지")

4. **Reflection**
   - How did it feel? ("생각보다 쉬웠어요", "어려웠어요", etc.)
   - Optional note for memory
   - Dot is placed

---

### 4. Dot History (MyDots Screen)

**Goal**: Show accumulated dots as visual proof of progress.

Features:
- Dots grouped by date (only dates with records shown)
- Dots colored by milestone
- Jitter/noise for visual interest
- Tap dot to see label + context
- Older dots fade slightly

---

## Data Model

### Milestone

```
{
  id: "ms_1234567890",
  name: "논문",
  colorKey: "purple"
}
```

- User-defined
- Up to 5
- Each has a unique color from palette

### Dot

```
{
  id: "dot_1234567890",
  date: "2026-05-21",
  milestoneId: "ms_...",
  label: "논문 — 파일만 열어두기",
  note: "30분 정도 했어요",
  reflection: "생각보다 쉬웠어요"
}
```

- One per "start"
- Immutable once created
- Optional note + reflection

---

## Key Features by Priority

### Must-Have (MVP)

- [x] Onboarding with milestone creation
- [x] Mode A (minimum action flow)
- [x] Mode B (step-by-step flow)
- [x] Dot history view
- [x] localStorage persistence
- [x] Mobile-responsive UI
- [x] PWA (installable on iOS)

### Should-Have

- [x] Option to skip milestone setup
- [x] Empty milestone state with setup button in modes
- [x] Multiple item input (1, 2, 3...) in Mode A/B
- [x] Dot reveal animation
- [x] Offline support (Service Worker)

### Nice-to-Have (Future)

- [ ] Export dot history (CSV/JSON)
- [ ] Share streak/progress
- [ ] Notifications/reminders
- [ ] Dark mode
- [ ] Sync across devices (cloud)
- [ ] Statistics (dots per week, most popular milestone, etc.)

---

## Success Metrics

- User creates 3+ milestones on day 1
- User places 3+ dots in first week
- User returns app on day 5+ (retention)
- User places dots consistently (habit formation)

---

## Non-Goals

- Deadline management
- Task completion tracking (we don't track % done)
- Team features
- Gamification (leaderboards, badges)
- Social sharing
