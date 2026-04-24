# Requirements — Phase 1: Hello Hono

## Scope

Install and configure the Hono framework with a `tsx` dev server. Expose a single `/` route that renders a minimal home page as server-side JSX. Confirm TypeScript types work end-to-end.

The home page must include the clinic name, its one-line mission, and a brief welcome message. No layout component, no CSS, no additional routes — those are deferred to later phases.

## Context

This is the foundation phase. Nothing else can be built until the server starts and TypeScript compiles cleanly. The goal is the smallest possible working slice: one file, one route, one confirmation curl.

See `specs/mission.md` for the product vision and `specs/tech-stack.md` for the rationale behind Hono and tsx.

## Decisions

| Decision | Value | Reason |
|---|---|---|
| Dev port | `3000` | Conventional, no conflict expected in local dev |
| Dev script | `tsx --watch src/index.ts` | Live reload without a build step |
| Node version | No engine pin yet | Deferred — add in a hardening phase |

## Out of Scope

- Linting / Prettier config
- Health-check or additional routes
- dotenv / typed config module
- Base layout component (Phase 2)
- CSS or styling
- Database or migrations
