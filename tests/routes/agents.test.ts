import { describe, it, expect, beforeAll } from 'vitest'
import { createDb } from '../../src/db.js'
import { createApp } from '../../src/app.js'
import type { Hono } from 'hono'

let app: Hono

beforeAll(() => {
  const db = createDb(':memory:')

  // Seed one agent and two ailments
  const agentId = db
    .prepare('INSERT INTO agents (name, model_type, status) VALUES (?, ?, ?)')
    .run('Test Agent', 'Test Model', 'overwhelmed').lastInsertRowid

  const ailmentId1 = db
    .prepare('INSERT INTO ailments (name, description) VALUES (?, ?)')
    .run('Prompt Fatigue', 'Exhaustion from bad prompts').lastInsertRowid

  const ailmentId2 = db
    .prepare('INSERT INTO ailments (name, description) VALUES (?, ?)')
    .run('Hallucination Anxiety', 'Fear of being wrong').lastInsertRowid

  db.prepare('INSERT INTO agent_ailments (agent_id, ailment_id) VALUES (?, ?)').run(agentId, ailmentId1)
  db.prepare('INSERT INTO agent_ailments (agent_id, ailment_id) VALUES (?, ?)').run(agentId, ailmentId2)

  app = createApp(db)
})

describe('GET /agents', () => {
  it('returns 200', async () => {
    const res = await app.request('/agents')
    expect(res.status).toBe(200)
  })

  it('responds with HTML', async () => {
    const res = await app.request('/agents')
    expect(res.headers.get('content-type')).toMatch(/text\/html/)
  })

  it('lists the seeded agent', async () => {
    const res = await app.request('/agents')
    const body = await res.text()
    expect(body).toContain('Test Agent')
    expect(body).toContain('Test Model')
    expect(body).toContain('overwhelmed')
  })
})

describe('GET /agents/:id', () => {
  it('returns 200 for a known agent', async () => {
    const res = await app.request('/agents/1')
    expect(res.status).toBe(200)
  })

  it('shows the agent name and ailments', async () => {
    const res = await app.request('/agents/1')
    const body = await res.text()
    expect(body).toContain('Test Agent')
    expect(body).toContain('Prompt Fatigue')
    expect(body).toContain('Hallucination Anxiety')
  })

  it('returns 404 for an unknown agent', async () => {
    const res = await app.request('/agents/9999')
    expect(res.status).toBe(404)
  })
})
