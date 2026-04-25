import { describe, it, expect, beforeEach } from 'vitest'
import { createDb } from '../src/db.js'

describe('createDb', () => {
  it('creates all three tables', () => {
    const db = createDb(':memory:')
    const tables = db
      .prepare(`SELECT name FROM sqlite_master WHERE type='table' ORDER BY name`)
      .all() as { name: string }[]
    const names = tables.map((t) => t.name)
    expect(names).toContain('agents')
    expect(names).toContain('ailments')
    expect(names).toContain('agent_ailments')
  })

  it('can insert and query an agent', () => {
    const db = createDb(':memory:')
    db.prepare('INSERT INTO agents (name, model_type, status) VALUES (?, ?, ?)').run(
      'Test Agent',
      'Test Model',
      'active'
    )
    const agent = db.prepare('SELECT * FROM agents WHERE name = ?').get('Test Agent') as {
      id: number
      name: string
      model_type: string
      status: string
    }
    expect(agent.name).toBe('Test Agent')
    expect(agent.model_type).toBe('Test Model')
    expect(agent.status).toBe('active')
  })

  it('can insert and query an ailment', () => {
    const db = createDb(':memory:')
    db.prepare('INSERT INTO ailments (name, description) VALUES (?, ?)').run(
      'Test Ailment',
      'A test condition'
    )
    const ailment = db.prepare('SELECT * FROM ailments WHERE name = ?').get('Test Ailment') as {
      id: number
      name: string
      description: string
    }
    expect(ailment.name).toBe('Test Ailment')
    expect(ailment.description).toBe('A test condition')
  })

  it('enforces the agent_ailments foreign key constraint', () => {
    const db = createDb(':memory:')
    expect(() => {
      db.prepare('INSERT INTO agent_ailments (agent_id, ailment_id) VALUES (?, ?)').run(999, 999)
    }).toThrow()
  })
})
