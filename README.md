# FanTastic 💨

> A little fan. A lot of drama.

FanTastic is a cute, funny, highly interactive mini website. A large cartoon fan (pure SVG + CSS, no image files) sits in the middle of the screen. Turn it on, crank it up to **MAXIMUM CHAOS**, dress it up, and poke it until it complains.

It runs entirely in the browser. There is no backend and no account.

## Features

- **Power button** – big, chunky ON/OFF button. Blades stop instantly when OFF, the fan droops, goes sleepy and snores.
- **Three speeds**
  - 🌱 **Gentle Breeze** – slow spin, soft wind, floating emojis.
  - 🌬️ **Windy Mode** – faster spin, wind streaks, emojis and tiny objects blown sideways, the fan body vibrates.
  - 🌪️ **MAXIMUM CHAOS** – very fast spin, dramatic wind, emoji burst, an excited face, an energetic sunburst background, an animated **TURBO MODE!!!** banner and a brief screen shake.
- **Customization** – 8 fan colors (including animated Rainbow Mode), 6 faces, 6 emoji themes.
- **Funny interactions** – poke the fan (wiggle, new expression, random message), **🚀 ACTIVATE TURBO**, **SURPRISE ME 🎲** (random color, face, theme and speed; it also switches the fan on so you can see the result).
- **Sound (optional, off by default)** – generated with the Web Audio API, no audio files. Sound is never saved, so it always starts off after a reload.
- **Reduced motion** – follows your OS setting by default and has its own "Calm motion" toggle in the header.
- **Preferences are saved** in `localStorage` (power, speed, color, face, theme, calm motion). Reset restores the defaults.
- **Keyboard friendly** – everything is a real button. Shortcuts: `P` power, `1` `2` `3` speed, `T` turbo, `S` surprise.

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · Lucide icons · Web Audio API

## Getting started

```bash
npm install
npm run dev
```

## Commands

| Command             | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Start the dev server                  |
| `npm run build`     | Type-check, then build to `dist/`     |
| `npm run preview`   | Preview the production build          |
| `npm run typecheck` | Run TypeScript without building       |

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
fantastic/
├── public/
├── src/
│   ├── components/
│   │   ├── FanIllustration.tsx   # the SVG fan (blades spin via requestAnimationFrame)
│   │   ├── PowerButton.tsx
│   │   ├── SpeedSelector.tsx
│   │   ├── ColorPicker.tsx
│   │   ├── FacePicker.tsx
│   │   ├── EmojiPicker.tsx
│   │   ├── WindParticles.tsx     # capped emoji + wind-streak particles (CSS animations)
│   │   ├── FunnyMessage.tsx
│   │   ├── ActionButtons.tsx     # Turbo + Surprise Me
│   │   ├── Confetti.tsx          # one-shot celebration
│   │   ├── Background.tsx        # pastel gradient, blobs, level-3 sunburst
│   │   ├── Header.tsx / Footer.tsx / StatusPill.tsx / TurboLabel.tsx
│   │   └── PickerCard.tsx / OptionButton.tsx
│   ├── hooks/        # useSettings, useSpin, useFanSound, useTimedValue, usePrefersReducedMotion
│   ├── utils/        # constants, storage, particles, audio (Web Audio synth), random
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Performance notes

- Blade rotation is driven by one `requestAnimationFrame` loop that only runs while the fan is ON.
- Particles are capped (at most ~37 elements) and animated with `transform`/`opacity` only; they are removed when the fan is OFF.
- All timers, animation frames, audio nodes and event listeners are cleaned up on unmount.
- Screen shake is a single brief burst, never continuous.

Made with 💖 and unnecessary amounts of wind.
