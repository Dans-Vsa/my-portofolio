# DESIGN.md: Danish Vesa Portfolio

The source of truth for tokens is `src/styles/tokens.css` and `tailwind.config.js`.
This file describes how to use them. The original reference was gabrielbeaugonin.com.

## 1. Atmosphere

Quiet, editorial, monochrome. Content is set in one grotesk family on near-white
paper, with depth coming from motion (3D spiral, card reel, lamp spotlight)
rather than from color. There is no accent hue: emphasis comes from weight,
size and black/white contrast.

Two surfaces:

- **Light** (Home, Projects): `bg #f6f6f6`, cards `#ffffff`, text `#000`.
- **Dark** (About): pure black stage lit by the lamp spotlight, text white, secondary
  text `zinc-300 / zinc-400`, hairlines `zinc-800`.

## 2. Color

| Token | Value | Use |
|---|---|---|
| `bg` | `#f6f6f6` | Light page background |
| `bg-secondary` | `#ffffff` | Cards, buttons on light |
| `text` | `#000000` | Primary text |
| `text-secondary` | `#666666` | Secondary text on light |
| `primary` | `#888888` | Hover and muted icons |
| `secondary` | `#aaaaaa` | Tertiary text |
| `border` | `#eaeaea` | Hairlines on light |
| Dark stage | `black`, `zinc-900/800/700/400/300`, `white` | About section only |

Rules: no gradients except the lamp, no colored accents, and no brand-colored tech
icons (render them in the current text color).

## 3. Typography

- Family: **Switzer** (Fontshare), standing in for Suisse Int'l. Use one family everywhere.
- Display: `font-bold tracking-tight leading-none`, from `text-4xl` up to `text-8xl`.
- Statement: `text-xl` up to `text-5xl`, `font-normal`, with the lead phrase in `font-semibold` white or black.
- Body: `text-base` up to `text-lg`, `leading-relaxed`.
- Eyebrow labels: `text-xs font-semibold uppercase tracking-[0.2em]`, in secondary color.
- Copy rules: no em dashes, short, human, factual.

## 4. Spacing and shape

- Spacing scale (tailwind): `xs 10.67`, `sm 21.33`, `md 42.67`, `lg 64`, `xl 85.33` px.
- Radius: `rounded-btn` 16px for buttons and chips, `rounded-card` 32px for cards and images, `rounded-full` for the circular back button and pills.
- Section rhythm on About: `gap-16 sm:gap-24`, max width `max-w-5xl`.

## 5. Components

- **Back button**: 44 to 56px circle, inverse of the surface (white on dark, black on light), arrow icon. Esc also goes back.
- **Icon button**: 44 to 56px square with `rounded-btn` and a 1px border. Hover lifts by 2px.
- **Language toggle (ID / EN)**: segmented pill with a sliding thumb (framer `layoutId`), in `light` and `dark` tones. It lives top-right on every screen. The choice persists in `localStorage` under `lang`.
- **Chip**: `rounded-btn` with a 1px border, icon plus label, `text-sm`.
- **Divided list**: rows separated by 1px hairlines, title left and meta right. Use this instead of card grids.

## 6. Motion

- Easing `[0.16, 1, 0.3, 1]` for section slides and `[0.22, 1, 0.36, 1]` for reveals.
- Reveal on scroll: `opacity 0 to 1`, `y 40 to 0`, 0.7 to 0.8s, `once: true`.
- Respect `prefers-reduced-motion`. App.jsx already skips the transitions.

## 7. Do and don't

- Do keep one idea per row, with generous whitespace.
- Do use hairline dividers and typographic hierarchy for structure.
- Don't nest cards inside cards, add color accents, or use drop-shadow glows on text, except the existing lamp glow.
- Don't make up numbers or claims in copy.
