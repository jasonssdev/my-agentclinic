import type Database from 'better-sqlite3'
import type { Agent, Ailment } from './types.js'

export function getAllAgents(db: Database.Database): Agent[] {
  return db.prepare('SELECT * FROM agents ORDER BY name').all() as Agent[]
}

export function getAgentById(db: Database.Database, id: number): Agent | undefined {
  return db.prepare('SELECT * FROM agents WHERE id = ?').get(id) as Agent | undefined
}

export function getAilmentsForAgent(db: Database.Database, agentId: number): Ailment[] {
  return db
    .prepare(
      `SELECT a.* FROM ailments a
       JOIN agent_ailments aa ON aa.ailment_id = a.id
       WHERE aa.agent_id = ?
       ORDER BY a.name`
    )
    .all(agentId) as Ailment[]
}

export function getAllAilments(db: Database.Database): Ailment[] {
  return db.prepare('SELECT * FROM ailments ORDER BY name').all() as Ailment[]
}
