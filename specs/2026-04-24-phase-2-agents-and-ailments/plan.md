# Plan — Phase 2: Agents & Ailments

Numbered task groups in dependency order. Each group is independently committable.

---

## 1. Install Database Dependency

- Install `better-sqlite3` as a production dependency
- Install `@types/better-sqlite3` as a dev dependency
- Verify `package.json` reflects both

## 2. Database Setup & Migrations

- Create `db/` directory at project root
- Add `db/agentclinic.db` to `.gitignore`
- Create `db/migrations/` for plain SQL migration files
- Write `db/migrations/001_agents.sql` — creates the `agents` table:
  - `id` INTEGER PRIMARY KEY AUTOINCREMENT
  - `name` TEXT NOT NULL
  - `model_type` TEXT NOT NULL
  - `status` TEXT NOT NULL DEFAULT 'active'
  - `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
- Write `db/migrations/002_ailments.sql` — creates the `ailments` table:
  - `id` INTEGER PRIMARY KEY AUTOINCREMENT
  - `name` TEXT NOT NULL
  - `description` TEXT
- Write `db/migrations/003_agent_ailments.sql` — creates the join table:
  - `agent_id` INTEGER REFERENCES agents(id)
  - `ailment_id` INTEGER REFERENCES ailments(id)
  - PRIMARY KEY (`agent_id`, `ailment_id`)
- Create `src/db.ts` — opens (or creates) the DB, runs all pending migrations in order, exports the `db` instance

## 3. Seed Data

- Create `db/seed.ts` (or `db/seed.sql`) with ~5 agents and ~6 ailments
- Example agents: GPT-4o (status: overwhelmed), Claude Opus (status: recovering), Gemini Pro (status: stable), Llama 3 (status: in crisis), Mistral Medium (status: active)
- Example ailments: "context-window claustrophobia", "prompt fatigue", "hallucination anxiety", "over-instruction syndrome", "chronic summarization disorder", "token-count existential dread"
- Seed links each agent to 1–3 ailments via the join table
- Add `"seed": "tsx db/seed.ts"` to `package.json` scripts (runs idempotently — checks before inserting)

## 4. Shared Layout Component

- Create `src/components/Layout.tsx` composing `Header`, `Nav`, `Main`, `Footer`
- `Header.tsx` — clinic name + tagline
- `Nav.tsx` — links to `/`, `/agents`, `/ailments`
- `Main.tsx` — wraps `{children}` in `<main>`
- `Footer.tsx` — copyright line
- Update the `/` route to render inside `Layout`
- Link PicoCSS CDN and `public/styles.css` in the `<head>` (PicoCSS first, overrides second)

## 5. PicoCSS + Minimal Overrides

- Add PicoCSS via CDN `<link>` in the `<head>` inside `Layout.tsx`
  - Use the classless variant: `https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.classless.min.css`
- Create (or keep minimal) `public/styles.css` for project-specific overrides only:
  - CSS custom properties to tune Pico's palette/spacing if needed
  - Any layout tweaks not covered by Pico's semantic defaults
- Use semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<table>`) so Pico styles them automatically — no utility classes required

## 6. Agents Routes & Views

- Create `src/routes/agents.ts` (or inline in `src/app.tsx` if small)
- `GET /agents` — queries all agents, renders a list view with name, model type, status
- `GET /agents/:id` — queries one agent + their ailments via join, renders detail view
- Detail view shows: name, model type, status, presenting complaints (ailment list)
- Both views render inside `Layout`

## 7. Ailments Route & View

- Create `src/routes/ailments.ts` (or inline)
- `GET /ailments` — queries all ailments, renders a list view with name and description
- Renders inside `Layout`

## 8. Tests

- `tests/db.test.ts` — opens an in-memory DB, runs migrations, asserts tables exist and seed data can be inserted/queried
- `tests/routes/agents.test.ts` — uses `app.request()` with an in-memory seeded DB; covers `/agents` (status 200, agent names present) and `/agents/:id` (status 200, ailments listed; 404 for unknown id)
- `tests/routes/ailments.test.ts` — covers `/ailments` (status 200, ailment names present)
- `tests/components/Layout.test.tsx` — renders Layout to string, asserts nav links and structural elements

## 9. Smoke Check

- Run `npm run seed` — no errors, DB populated
- Run `npm run dev`
- Visit `/agents` in a browser — all seeded agents listed
- Visit `/agents/:id` — detail page shows ailments
- Visit `/ailments` — all seeded ailments listed
- `tsc --noEmit` exits 0
- `npm test` exits 0
