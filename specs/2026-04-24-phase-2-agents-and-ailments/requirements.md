# Requirements — Phase 2: Agents & Ailments

## Scope

Build out the shared layout, basic CSS, SQLite database with migrations, and the first two domain entities: agents and ailments. All routes must render inside the shared layout. The phase ends when `/agents`, `/agents/:id`, and `/ailments` are live with seeded data and linked correctly.

Specific deliverables:
- Server-side JSX layout component (Header, Nav, Main, Footer) wrapping every route
- PicoCSS loaded via CDN for reset, typography, and semantic HTML styling
- SQLite database wired up via `better-sqlite3`; migrations via plain SQL files
- `agents` table with seed data (~5 fictional agents)
- `ailments` table with seed data (~6 ailments, e.g. "context-window claustrophobia", "prompt fatigue")
- `agent_ailments` join table linking agents to one or more ailments
- `/agents` — list page showing all agents
- `/agents/:id` — detail page showing a single agent's name, model type, current status, and presenting complaints (linked ailments)
- `/ailments` — list page showing all ailments

## Context

Phase 1 established the server, TypeScript config, and a minimal home page. This phase adds everything needed to show real domain data in a real layout. The app is still read-only — no forms, no writes from the browser.

See `specs/mission.md` for the product vision (agents need wellness support) and `specs/tech-stack.md` for rationale behind Hono JSX and SQLite.

## Decisions

| Decision | Value | Reason |
|---|---|---|
| Agent↔ailment linking | Join table (`agent_ailments`) | Flexible many-to-many; SQL is sufficient at this scale |
| Seed agents | ~5 records | Enough to demonstrate list + detail without excessive noise |
| Seed ailments | ~6 records | Representative variety of ailment types |
| CSS approach | PicoCSS via CDN + minimal `public/styles.css` for overrides | No build step; semantic HTML gets good styles for free |
| Route structure | `/agents`, `/agents/:id`, `/ailments` | RESTful, conventional, easy to extend |
| Migrations | Plain SQL files in `db/migrations/` | No ORM; matches tech-stack decision |
| DB file location | `db/agentclinic.db` (gitignored) | Local dev only; not committed |

## Out of Scope

- Therapies (`/therapies` is Phase 3)
- Appointment booking (Phase 4)
- Any forms or write operations
- Auth or session handling
- Therapist profiles
