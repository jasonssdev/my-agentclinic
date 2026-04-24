# Plan — Phase 1: Hello Hono

Numbered task groups in dependency order. Each group is independently committable.

---

## 1. Install Dependencies

- Install `hono` as a production dependency
- Install `tsx` as a dev dependency (if not already present)
- Verify `package.json` reflects both

## 2. Configure TypeScript

- Confirm `tsconfig.json` has `"jsx": "react-jsx"` and `"jsxImportSource": "hono/jsx"` (required for Hono JSX later; safe to add now)
- Confirm `"module"` and `"moduleResolution"` are compatible with Node + Hono (use `"NodeNext"` or `"Bundler"`)

## 3. Write the Server Entry Point

- Replace placeholder `src/index.ts` with a Hono app
- Define a single `GET /` route returning `"AgentClinic is open for business"`
- Start the server on port `3000` using Hono's Node adapter (`@hono/node-server`)

## 4. Add Dev Script

- Add `"dev": "tsx --watch src/index.ts"` to `package.json` scripts
- Confirm `npm run dev` starts without errors

## 5. Minimal Home Page

- Convert the `/` route to return server-side JSX (using Hono's JSX renderer)
- Page must include: the clinic name, the one-line mission ("AgentClinic — full-service wellness for AI agents"), and a brief welcome message
- No layout component yet (that's Phase 2) — a single self-contained JSX response is fine
- No CSS required — unstyled HTML is acceptable at this stage

## 6. Smoke Check

- Run `npm run dev`
- `curl http://localhost:3000` returns an HTML page with the clinic name and welcome content
- Opening `http://localhost:3000` in a browser renders a readable home page
- `tsc --noEmit` exits 0 (no type errors)
