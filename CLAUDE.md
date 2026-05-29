# Claude Code Working Guide for dot-moments

## Project Context

**dot-moments** is a mindfulness practice app for perfectionist people who struggle to start. Core concept: each time you start something (no matter how small), a dot is placed. Dots accumulate into a personal trajectory showing progress, not perfection.

---

## Reference Priority

Always consult these files before implementation:

1. `/docs/product/PRD.md` — Feature scope, user flows, milestones
2. `/docs/design/UX_PRINCIPLES.md` — App philosophy and interaction patterns
3. `/docs/design/DESIGN_SYSTEM.md` — Colors, typography, spacing, components
4. `/docs/content/COPY_GUIDELINES.md` — Tone, Korean language style, messaging

**If implementation conflicts with product intent, prioritize product intent.**

---

## Core Rules

- Keep changes minimal and focused
- Never modify unrelated files
- Preserve existing architecture patterns (store-based, React hooks)
- Prefer composition over abstraction
- Prefer explicitness over cleverness
- Respect the mobile-first, light theme aesthetic

---

## Code Style

### React + JSX

- Keep components small and single-purpose
- Use `useState` for local state, `loadData()`/`saveData()` for persistence
- Extract reusable logic into helper functions
- Prefer inline styles over external CSS (consistency with current codebase)
- Use CSS custom properties for theming (`--bg`, `--text-primary`, etc.)

### Naming

Use descriptive semantic names.

Good:
- `MilestoneSetup`
- `suggestMinAction`
- `addDot`
- `selectedTaskIdx`

Bad:
- `Modal`
- `helper`
- `tempState`
- `idx`

---

## Commit Convention

```
[feat/fix/refactor/docs/chore]: [change name]
```

Examples:
- `[feat]: Add multiple task input to Mode A/B`
- `[fix]: Correct milestone color continuation`
- `[refactor]: Extract task list input into component`
- `[docs]: Update UX principles for onboarding`

---

## Before Every Change

Validate:

1. **Product intent:** Does this align with the "start, don't perfect" philosophy?
2. **Simplicity:** Is this the simplest valid solution?
3. **Consistency:** Does this match existing code patterns and design?
4. **No bloat:** Does this reduce or preserve complexity?

---

## Architecture

### State Management

- **localStorage**: User data (milestones, dots, onboarding status) via `store.js`
- **React hooks**: UI state (current screen, modal state, form inputs)
- **Custom events**: Cross-component sync (`milestones-updated`, `dots-updated`)

### File Structure

```
/src
  /components      # Reusable UI (GradientDot, MilestoneSetup, DotReveal)
  /screens         # Full-screen flows (Home, MyDots, ModeA, ModeB, Onboarding)
  /store.js        # Data persistence and fetch
  /index.css       # Global styles + theme variables
  /main.jsx        # React entry point
  /App.jsx         # Top-level routing & modal management
```

### Component Patterns

- **Screens**: Full-screen overlays, manage their own step state
- **Components**: Reusable, prop-driven, no side effects
- **Styling**: Inline object styles (consistency), CSS custom properties for colors/spacing

---

## Key Implementation Patterns

### Data Layer (`store.js`)

```js
loadData()       // → { milestones: [...], dots: [...], onboardingDone }
saveData(data)   // persist to localStorage
addDot(...)      // create dot + save + dispatch event
```

### Milestone Color Assignment

New milestones continue from existing: `colorOffset = existing.length`

### Dot Rendering

- Small dots (≤20px): flat solid color
- Large dots (>20px): gradient with glow effect
- Reference: `GradientDot` component, `DOT_COLORS` array

### Service Worker & PWA

- `public/sw.js`: Cache-first strategy for offline support
- `public/manifest.json`: App metadata
- Icons: 180×192×512px PNGs for iOS/Android
- Service worker registered in `index.html`

---

## Output Expectations

When making changes:

1. **What changed** — Summary of the modification
2. **Why** — Reasoning aligned with product/design/code goals
3. **Files affected** — List of modified/created files
4. **Testing notes** — How to verify the change works

---

## Known Constraints

- **Node.js**: v20.5.1 (no TypeScript, use plain JS)
- **Mobile-first**: All screens designed for 390×844px (phone) viewport
- **Light theme only**: `--bg: #e8e8e5`, `--text-primary: #1a1a1c`
- **Korean**: All UI copy is Korean; maintain casual, warm tone
- **No backend**: All data lives in localStorage

---

## Quick Checklist Before Committing

- [ ] Consulted relevant `/docs/` files?
- [ ] Code follows naming conventions?
- [ ] No unnecessary complexity added?
- [ ] Consistent with existing patterns (styling, state, components)?
- [ ] Commit message follows convention?
- [ ] Build succeeds (`npm run build`)?
- [ ] Works on mobile viewport (390×844)?
