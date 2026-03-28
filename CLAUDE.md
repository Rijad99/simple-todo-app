# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # TypeScript check + production build
npm run lint         # ESLint check
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier format src/**/*.{ts,tsx,css}
npm run format:check # Prettier check without writing
npm run preview      # Preview production build
```

There are no tests in this project.

## Architecture

**Stack**: React 19, TypeScript (strict), Vite 8, Tailwind CSS v4, Framer Motion

**State**: All todo state lives in `src/features/todos/hooks/useTodos.ts` — a single custom hook using `useLocalStorage` for persistence. No external state library. `App.tsx` holds filter state and wires everything together.

**Folder conventions**:
- `src/features/<name>/` — feature-scoped code (components, hooks, types, `index.ts` barrel)
- `src/shared/` — reusable components, hooks, utils used across features
- Cross-feature imports must go through barrel `index.ts`, never import internals directly

**Path alias**: `@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`).

**Styling**: Tailwind v4 — imported via `@import 'tailwindcss'` in `index.css`, no `tailwind.config.js` needed. Custom theme tokens (fonts, animations) are defined in the `@theme` block in `index.css`.

**Animations**: Framer Motion is used throughout — `AnimatePresence` for enter/exit, `motion.div`/`motion.svg` for transitions. The custom `blink` keyframe animation is defined in `index.css`.

**Classnames**: Uses a minimal `cn()` utility at `src/shared/utils/cn.ts` (no `clsx`/`classnames` dependency).

**Destructive actions** (delete todo, clear completed) require confirmation via the shared `Dialog` component.
