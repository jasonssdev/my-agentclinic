import Database from 'better-sqlite3'
import { readFileSync } from 'fs'
import { join } from 'path'

const MIGRATION_FILES = [
  '001_agents.sql',
  '002_ailments.sql',
  '003_agent_ailments.sql',
]

export function createDb(filename: string): Database.Database {
  const db = new Database(filename)
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')

  const migrationsDir = join(process.cwd(), 'db', 'migrations')
  for (const file of MIGRATION_FILES) {
    const sql = readFileSync(join(migrationsDir, file), 'utf-8')
    db.exec(sql)
  }

  return db
}
