# Design System: dot-moments

## Color

Inspired by ElevenLabs' editorial design language — off-white canvas, warm near-black ink, gradient dots as the only "color" moments.

### Theme
```css
/* Canvas */
--bg: #f5f5f5;          /* off-white canvas */
--bg-card: #ffffff;     /* pure white cards */
--surface-strong: #f0efed; /* badge/chip bg */

/* Text */
--text-primary: #0c0a09;   /* warm near-black ink */
--text-secondary: #4e4e4e; /* body text */
--text-dim: #a8a29e;       /* muted/placeholder */

/* Borders */
--border: #e7e5e4;         /* hairline */
--border-strong: #d6d3d1;  /* inputs */

/* Shadow */
--shadow-card: 0 4px 16px rgba(0,0,0,0.04);
```

### Dot Colors
| Color | Key | Flat | Gradient | Glow |
|-------|-----|------|----------|------|
| Blue | `blue` | #1976d2 | 135deg gradient | rgba(79,195,247,0.55) |
| Purple | `purple` | #7b1fa2 | 135deg gradient | rgba(206,147,216,0.55) |
| Orange | `orange` | #e65100 | 135deg gradient | rgba(255,109,0,0.5) |
| Green | `green` | #2e7d32 | 135deg gradient | rgba(0,200,83,0.5) |
| Pink | `pink` | #c2185b | 135deg gradient | rgba(244,143,177,0.55) |

**Note**: Dots ≤20px use flat color. Dots >20px use gradient + optional glow.

---

## Typography

### Font
Pretendard (Google Fonts): weights 300, 400, 500, 600, 700

Display runs at **weight 300** — editorial, never bold. Body stays at 400/500 for legibility.

### Scale
| Size | Weight | Letter Spacing | Use |
|------|--------|----------------|-----|
| 24px | **300** | -0.3px | Page title (editorial) |
| 22px | **300** | -0.2px | Section heading |
| 17px | 500 | 0 | Card content |
| 15px | 400 | 0 | Body |
| 14px | 400 | 0 | Secondary |
| 13px | 500 | 0.05em | Caption/label (uppercase) |
| 12px | 400 | 0 | Small text |
| 56px | 300 | 0 | Timer (tabular-nums) |

---

## Spacing

Use scale: **4 / 8 / 12 / 16 / 24 / 32**

| Token | Value | Use |
|-------|-------|-----|
| `xs` | 4px | Icon gaps |
| `sm` | 8px | Input padding, inline gaps |
| `md` | 12px | Component padding |
| `lg` | 16px | Card padding, moderate gaps |
| `xl` | 24px | Screen padding |
| `2xl` | 32px | Major spacing |

**In code**: Use pixel values directly (e.g., `padding: '16px'`, `gap: 8`)

---

## Border Radius

Prefer:
- `rounded-lg` (12px) — Buttons, inputs, cards, list items
- `rounded-xl` (14px) — Button variants
- `rounded-2xl` (16px) — Large cards
- `50%` — Dots (circles)

---

## Motion

**Principles**:
- Subtle (don't distract)
- Under 300ms (don't feel sluggish)
- Meaningful (only animate if it communicates)

### Timing
- UI interactions: `0.15s`
- Screen transitions: `0.35s`
- Dot appear: `0.6s` (exception for celebration)

### Easing
- Transitions: `ease` or `cubic-bezier(0.25, 0.1, 0.25, 1)` (panel slides)
- Dot appear: `cubic-bezier(0.34,1.56,0.64,1)` (bouncy)

---

## Component Principles

Components must be:

**Composable**: Build from smaller, reusable pieces. Avoid monolithic components.

**Accessible**: 
- Semantic HTML (button, input, etc.)
- 4.5:1 contrast minimum
- 48px touch targets
- Clear focus states

**Predictable**: 
- Props have clear intent
- Behavior matches user expectation
- No side effects in render

**Semantically Named**:
- `<GradientDot />` not `<Dot />`
- `handleSave` not `handleClick`
- `selectedTaskIdx` not `idx`

---

## Components

### Buttons

**Primary — ink pill (btn-main)**
```jsx
{
  background: '#292524',
  color: '#ffffff',
  borderRadius: 9999,   // pill
  height: 48,
  fontSize: 15,
  fontWeight: 500,
}
// Hover: background '#0c0a09'
// Disabled: background 'var(--surface-strong)', color 'var(--text-dim)'
```

**Secondary — outline pill (btn-secondary)**
```jsx
{
  background: '#ffffff',
  border: '1px solid var(--border-strong)',
  borderRadius: 9999,   // pill
  padding: '10px 20px',
  fontSize: 14,
  fontWeight: 500,
}
```

**Card button (btn-primary)**
```jsx
{
  background: '#ffffff',
  border: '1px solid var(--border)',
  borderRadius: 16,
  boxShadow: 'var(--shadow-card)',
}
```

**Ghost (btn-ghost)**
```jsx
{
  background: 'none',
  border: 'none',
  color: 'var(--text-secondary)',
}
```

### Inputs

```jsx
{
  background: '#ffffff',
  border: '1px solid #d6d3d1',
  borderRadius: 8,
  padding: '13px 16px',
  outline: 'none',
}
// Focus: borderColor '#292524'
// Blur: borderColor '#d6d3d1'
```

### + Button (inline list inputs)
```jsx
{
  background: '#292524',  // active
  // background: '#f0efed',  // disabled
  borderRadius: 9999,
  color: '#ffffff',
}
```

### Selection States

```js
SEL_ON = { 
  borderColor: '#292524', 
  background: 'rgba(41,37,36,0.07)' 
}
SEL_OFF = { 
  borderColor: '#e7e5e4', 
  background: 'transparent' 
}
```

---

## Responsive

**Primary target**: 390×844px (iPhone SE)
**Responsive range**: 375–414px wide
**Orientation**: Portrait only

```css
.phone-frame {
  width: min(390px, 100vw);
  height: min(844px, 100vh);
}
```

---

## Implementation

- **Layout**: Flexbox (no grid)
- **Colors**: CSS custom properties (`var(--bg)`)
- **Sizing**: Pixels (px)
- **Z-index**: Screens 50, overlays 200
- **No**: Dark mode, hover-only interactions, shadows (except dot glow)
