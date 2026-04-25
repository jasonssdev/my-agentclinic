# Plan — Phase 1: Hello Hono

Numbered task groups in dependency order. Each group is independently committable.

---

## 1. Install Dependencies

- Install `hono` as a production dependency
- Install `tsx` and `vitest` as dev dependencies
- Verify `package.json` reflects all three

## 2. Configure TypeScript

- Confirm `tsconfig.json` has `"jsx": "react-jsx"` and `"jsxImportSource": "hono/jsx"` (required for Hono JSX later; safe to add now)
- Confirm `"module"` and `"moduleResolution"` are compatible with Node + Hono (use `"NodeNext"` or `"Bundler"`)

## 3. Write the Server Entry Point

- Create `src/app.tsx` that defines and exports the Hono app instance
- Define a single `GET /` route returning `"AgentClinic is open for business"`
- Create `src/index.tsx` as the server entry point: imports `app` and calls `serve()` on port `3000`
- Keeping app and server startup separate makes the app importable in tests without binding a port

## 4. Add Scripts

- Add `"dev": "tsx --watch src/index.tsx"` to `package.json` scripts
- Add `"test": "vitest run"` and `"test:watch": "vitest"` scripts
- Confirm `npm run dev` starts without errors

## 5. Minimal Home Page

- Convert the `/` route to return server-side JSX (using Hono's JSX renderer)
- Page must include: the clinic name, the one-line mission ("AgentClinic — full-service wellness for AI agents"), and a brief welcome message
- No layout component yet (that's Phase 2) — a single self-contained JSX response is fine
- No CSS required — unstyled HTML is acceptable at this stage

## 6. Main Layout Component

- Create one file per component under `src/components/`:
  - `Header.tsx` — site name and nav placeholder
  - `Main.tsx` — wraps `{children}` in a `<main>` element
  - `Footer.tsx` — copyright line
  - `Layout.tsx` — imports and composes the three above into the full HTML shell
- Create `public/styles.css` with basic reset and structural styles for the layout
- Serve the `public/` directory as static assets via `serveStatic` from `@hono/node-server/serve-static`
- `Layout` links to `/public/styles.css` in the `<head>`
- Update the `/` route in `src/index.tsx` to use `Layout`

## 7. Vitest Tests

- Create test files under `tests/` (mirrors `src/` structure, no test files inside `src/`)
- `tests/app.test.ts` — uses Hono's `app.request()`; covers `GET /` status, content-type, clinic name, mission
- `tests/Header.test.tsx`, `Footer.test.tsx`, `Main.test.tsx`, `Layout.test.tsx` — render each component to string and assert structure

## 8. Smoke Check

- Run `npm run dev`
- `curl http://localhost:3000` returns an HTML page with the clinic name and welcome content
- Opening `http://localhost:3000` in a browser renders a readable home page
- `tsc --noEmit` exits 0 (no type errors)
- `npm test` exits 0
