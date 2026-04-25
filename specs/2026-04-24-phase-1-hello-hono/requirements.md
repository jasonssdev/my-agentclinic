# Requirements — Phase 1: Hello Hono

## Scope

Install and configure the Hono framework with a `tsx` dev server. Expose a single `/` route that renders a minimal home page as server-side JSX inside a shared layout (Header / Main / Footer). Serve a basic CSS file. Confirm TypeScript types work end-to-end and Vitest tests pass.

The home page must include the clinic name, its one-line mission, and a brief welcome message.

## Context

This is the foundation phase. Nothing else can be built until the server starts and TypeScript compiles cleanly. The app definition lives in `src/app.tsx` (exported, testable) and the server entry point in `src/index.tsx` (calls `serve()` — not imported in tests).

See `specs/mission.md` for the product vision and `specs/tech-stack.md` for the rationale behind Hono, tsx, and Vitest.

## Decisions

| Decision | Value | Reason |
|---|---|---|
| Dev port | `3000` | Conventional, no conflict expected in local dev |
| Dev script | `tsx --watch src/index.tsx` | Live reload without a build step |
| Test runner | Vitest (`npm test`) | Fast, TypeScript-native, no separate config needed |
| Node version | No engine pin yet | Deferred — add in a hardening phase |

## Out of Scope

- Linting / Prettier config
- Health-check or additional routes
- dotenv / typed config module
- Database or migrations
