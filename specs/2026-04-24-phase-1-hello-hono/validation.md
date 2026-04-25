# Validation — Phase 1: Hello Hono

## Definition of Done

This phase is complete when all checks below pass — both automated (`npm test`, `tsc --noEmit`) and manual (dev server, browser).

---

## Checks

### 1. Dev server starts

```bash
npm run dev
```

Expected: server logs something like `Listening on http://localhost:3000` (or equivalent) with no TypeScript or runtime errors.

### 2. Root route returns an HTML home page

```bash
curl http://localhost:3000
```

Expected: HTML response containing the clinic name (`AgentClinic`) and welcome content.

HTTP status: `200 OK`, `Content-Type: text/html`

### 3. Home page is readable in a browser

Open `http://localhost:3000` in a browser. Expected: a readable page showing at minimum:
- The clinic name
- The one-line mission statement
- A brief welcome message

### 4. Tests pass

```bash
npm test
```

Expected: all Vitest tests pass, exits with code `0`.

### 5. No TypeScript errors

```bash
npx tsc --noEmit
```

Expected: exits with code `0`, no errors printed.

---

## Merge Criteria

All five checks above pass. The branch is clean and PR-ready.
