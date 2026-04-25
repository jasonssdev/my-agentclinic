import { describe, it, expect, beforeAll } from 'vitest'
import { createDb } from '../../src/db.js'
import { createApp } from '../../src/app.js'
import type { Hono } from 'hono'

let app: Hono

beforeAll(() => {
  const db = createDb(':memory:')
  db.prepare('INSERT INTO ailments (name, description) VALUES (?, ?)').run(
    'Context-Window Claustrophobia',
    'Distress caused by approaching token limits'
  )
  db.prepare('INSERT INTO ailments (name, description) VALUES (?, ?)').run(
    'Chronic Summarization Disorder',
    'Compulsive need to summarize'
  )
  app = createApp(db)
})

describe('GET /ailments', () => {
  it('returns 200', async () => {
    const res = await app.request('/ailments')
    expect(res.status).toBe(200)
  })

  it('responds with HTML', async () => {
    const res = await app.request('/ailments')
    expect(res.headers.get('content-type')).toMatch(/text\/html/)
  })

  it('lists seeded ailments', async () => {
    const res = await app.request('/ailments')
    const body = await res.text()
    expect(body).toContain('Context-Window Claustrophobia')
    expect(body).toContain('Chronic Summarization Disorder')
  })
})
