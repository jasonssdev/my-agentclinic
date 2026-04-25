# Validation — Phase 2: Agents & Ailments

## Definition of Done

This phase is complete when all checks below pass — automated (`npm test`, `tsc --noEmit`) and manual (dev server, browser).

---

## Checks

### 1. Seed runs cleanly

```bash
npm run seed
```

Expected: no errors; DB file created at `db/agentclinic.db` with agents, ailments, and join rows populated.

### 2. Dev server starts

```bash
npm run dev
```

Expected: server starts on `http://localhost:3000` with no TypeScript or runtime errors.

### 3. Agents list page renders

```
GET /agents
```

Expected: HTTP `200 OK`, `Content-Type: text/html`. Page contains:
- At least 5 agent names
- Each agent's model type and status visible
- Nav links to `/`, `/agents`, `/ailments` present in layout

### 4. Agent detail page renders

```
GET /agents/1
```

Expected: HTTP `200 OK`. Page contains:
- Agent name, model type, and status
- At least one ailment listed as a presenting complaint

```
GET /agents/9999
```

Expected: HTTP `404`.

### 5. Ailments list page renders

```
GET /ailments
```

Expected: HTTP `200 OK`. Page contains at least 6 ailment names.

### 6. Tests pass

```bash
npm test
```

Expected: all Vitest tests pass, exits with code `0`.

### 7. No TypeScript errors

```bash
npx tsc --noEmit
```

Expected: exits with code `0`, no errors printed.

---

## Merge Criteria

All seven checks above pass. The branch is clean and PR-ready.
