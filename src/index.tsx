import { serve } from '@hono/node-server'
import { createApp } from './app.js'
import { createDb } from './db.js'

const db = createDb('db/agentclinic.db')
const app = createApp(db)

const server = serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log('AgentClinic is open for business on http://localhost:3000')
})

server.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error('Port 3000 is already in use. Kill the existing process and try again:\n  lsof -ti:3000 | xargs kill')
    process.exit(1)
  }
  throw err
})
