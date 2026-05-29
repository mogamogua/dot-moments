# UX Principles: dot-moments

## Philosophy

**Starting is the hardest part. Make it frictionless.**

Every interaction should reduce barriers to starting, not add them.

---

## Core Principles

### 1. Simplicity Over Features

- One action per screen (or two, maximum)
- Hide complexity; surface only what's needed now
- No tabs, no sidebars, no settings dialogs
- Linear flows (Step 1 → Step 2 → Step 3)

**In practice**: Mode A/B break the flow into 4 distinct screens. Each screen has one clear action.

---

### 2. Embrace Imperfection

- Celebrate small starts, not perfect completions
- Don't ask "Did you finish?" — ask "Did you start?"
- Dot = showing up, not achieving
- Allow partial progress ("오늘은 여기까지")

**In practice**: Mode B lets users stop early. No judgment, no pressure.

---

### 3. Minimal Input

- Ask for the minimum information needed
- Don't require polish or formality
- Placeholders use casual language ("툭 적어요", "딱 1분만")
- Accept rough, messy input

**In practice**: Both modes accept stream-of-consciousness text. No need for perfect grammar.

---

### 4. Immediate Feedback

- Confirm every action instantly
- Dot reveal animation = celebration
- No loading states or delays
- If something fails, be honest (show error, offer fix)

**In practice**: "점 찍기" immediately shows dot reveal, not a loading spinner.

---

### 5. Mobile-First & Touch-Friendly

- All interactions designed for thumb (bottom half of screen)
- Large tap targets (48px min)
- Avoid hover-only interactions
- Full-screen flows (no small modals)

**In practice**: Buttons are 40-50px tall. Primary action always bottom of screen.

---

### 6. Light, Calm Aesthetic

- Light gray background (#e8e8e5) reduces visual noise
- Gradient dots add warmth without chaos
- Ample whitespace
- Typography is warm (Pretendard, serif fallback)
- No dark mode (intentional — light = clarity)

**In practice**: High contrast between text and background. Icons/dots are colorful; everything else is neutral.

---

## Interaction Patterns

### Flows (Mode A, Mode B, Onboarding)

- Linear, step-by-step
- No going backward (user can close and start over)
- Progress indicated by step number or progress bar
- Each step is a distinct screen (full-screen overlay)

### List Selection (Milestones, Tasks, Goals)

- Single tap to select (visual highlight)
- Selected state: darker border + background
- Multiple taps cycle through selection
- × button to remove (always visible, right side)

### Input Fields

- Rounded corners (12px)
- Subtle border on focus
- Placeholder text is encouraging, not instructional
- Auto-focus on modals for quick typing
- `+` button only enabled when input is non-empty

### Buttons

- **Primary action** (btn-main): Dark, high-contrast, always bottom of screen
- **Secondary** (btn-secondary): Light outline, less prominent
- **Dismiss/Alternative** (btn-ghost): Text-only, lowest priority
- All buttons have smooth transitions (0.15s)

---

## Typography

- **Font**: Pretendard (Google Fonts), sans-serif
- **Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semi-bold), 700 (bold)
- **Hierarchy**:
  - Large headings: 24px, weight 700, line-height 1.4
  - Body text: 15px, weight 400
  - Secondary text: 14px, weight 400, color --text-secondary
  - Captions/labels: 12-13px, weight 500, color --text-dim
  - Numbers (timer): 56px, weight 300, monospace numbers

---

## Color Usage

- **Background**: #e8e8e5 (neutral, calming)
- **Dots**: 5-color gradient palette (blue, purple, orange, green, pink)
  - Small dots (≤20px): Flat solid color
  - Large dots (>20px): Gradient + glow
- **Text**:
  - Primary: #1a1a1c (dark gray, high contrast)
  - Secondary: #6a6a6a (medium gray)
  - Dim: #b4b4b4 (light gray, subtle)
- **Borders/Dividers**: rgba(0,0,0,0.07) or lighter

---

## Animation & Micro-interactions

- **Dot Appear**: `dotAppear` keyframe (0.6s, bouncy easing)
- **Dot Pulse**: Brief pulse when revealed
- **Fade In**: Screen transitions, elements appearing
- **Ripple**: Dot reveal creates expanding rings
- **Transitions**: 0.15s smooth for all interactive elements
- **No jank**: Use CSS transforms, not color/background changes for performance

---

## Accessibility

- **Contrast**: All text meets WCAG AA (4.5:1 minimum)
- **Touch targets**: 48×48px minimum (buttons are larger)
- **Semantic HTML**: Use proper button/input elements
- **Focus states**: All interactive elements have visible focus
- **No flash**: No animations exceed 3 Hz (seizure safety)

---

## Mobile Breakpoints

- **Primary**: 390×844px (iPhone SE / 8 / SE2)
- **Responsive**: 375–844px (covers most phones)
- **Desktop**: 1280×800 is supported but not optimized
- Assume portrait orientation only

---

## What NOT to Do

- ❌ Dark mode (not on-brand)
- ❌ Complex forms with many inputs
- ❌ Animations that distract from content
- ❌ Hover-only interactions
- ❌ Settings/preferences (keep it simple)
- ❌ Scrollable overlays (full-screen only)
- ❌ Notification badges or counters
- ❌ Time-based auto-dismissal (respect user pace)

---

## Tone

- **Warm & Encouraging**: "좋아요", "괜찮아요", "쉬워요"
- **Casual**: Avoid corporate language
- **Gentle**: No judgment ("평가가 아니라 관찰이에요")
- **Curious**: Invite reflection without pressure
- **Brief**: Short labels, short sentences
