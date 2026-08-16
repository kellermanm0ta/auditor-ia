<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AuditorIA — agent guide

## Commands
- `npm run dev` — start dev server
- `npm run build` — production build (also runs TypeScript check)
- `npm run lint` — ESLint (no type check)
- No tests exist. No test framework is configured.

## Architecture
- **Single-page dashboard** — no routes. `app/page.tsx` manages a `useState`-driven tab system (`activeTab`). Sidebar links switch tabs, not URLs.
- **All components are `'use client'`** because every tab has interactivity (toggles, buttons, copy, search).
- **Most data is static** in `data/*.ts` — plain typed arrays/objects imported directly. Exception: the **Integrations** tab fetches from the backend API.
- **Path alias**: `@/*` maps to project root (e.g. `@/data/skills`, `@/components/Sidebar`).
- **API proxy** (dev only): `next.config.ts` rewrites `/api/:path*` → `http://localhost:8000/api/:path*` to avoid CORS. In production, a reverse proxy (Nginx, Caddy, etc.) must route `/api/*` to the backend on port 8000.

## Styling
- **Bootstrap 5.3** via `node_modules` imports in `layout.tsx` (includes dark mode via `data-bs-theme`).
- **Custom CSS** in `app/globals.css` using CSS variables. Light/dark theme toggle changes `data-bs-theme` on `<html>` and CSS variables update accordingly.
- **Bootstrap Icons**: import from `bootstrap-icons/font/bootstrap-icons.css`, use `bi-*` classes.
- **Tailwind v4** is installed (via `@tailwindcss/postcss`) but barely used — the project relies on Bootstrap classes + custom CSS.

## Key gotchas
- **Markdown rendering**: `react-markdown` needs `remark-gfm` plugin to render tables. Already configured in `HomeTab.tsx`.
- **Icons**: use Bootstrap Icons (`<i className="bi bi-shield-check"></i>`), not emoji or SVG.
- **Theme**: managed by `useState<'light' | 'dark'>` in `page.tsx`, synced to `<html data-bs-theme="{theme}">`. Add/update CSS variables in `globals.css` under `[data-bs-theme="dark"]` and `[data-bs-theme="light"]`.
- **Input group styling**: `.input-group-text` uses CSS variables (`--bg-elevated`, `--border-color`). Do not inline hardcoded colors.

## Data files (`data/`)
| File | Exports | Type |
|---|---|---|
| `skills.ts` | `skillsData` | `Skill[]` |
| `analysis.ts` | `mockAnalysis` | `string` (markdown) |
| `history.ts` | `historyData` | `HistoryItem[]` |
| `integrations.ts` | `Integration` (type only) | `Integration[]` |
| `outputFormats.ts` | `outputFormats` | `OutputFormat[]` |

To add new data, create a typed file in `data/` and import it. No service layer, no context provider.

## Reusable components
- **`AsyncWrapper`** — handles `loading`/`error` states with a spinner or error icon. Used by `IntegrationsTab`. Props: `loading`, `error`, `loadingMessage?`, `errorMessage?`, `children`.