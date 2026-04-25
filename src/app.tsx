import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import type Database from 'better-sqlite3'
import { Layout } from './components/Layout.js'
import { agentsRoutes } from './routes/agents.js'
import { ailmentsRoutes } from './routes/ailments.js'

export function createApp(db: Database.Database): Hono {
  const app = new Hono()

  app.use('/public/*', serveStatic({ root: './' }))

  app.get('/', (c) => {
    return c.html(
      <Layout>
        <h1>Welcome to AgentClinic</h1>
        <p>AgentClinic — full-service wellness for AI agents</p>
        <p>The clinic is open and ready to serve your agents.</p>
      </Layout>
    )
  })

  app.route('/agents', agentsRoutes(db))
  app.route('/ailments', ailmentsRoutes(db))

  return app
}
