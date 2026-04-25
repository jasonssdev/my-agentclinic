import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Layout } from './components/Layout.js'

const app = new Hono()

app.use('/public/*', serveStatic({ root: './' }))

app.get('/', (c) => {
  return c.html(
    <Layout title="AgentClinic">
      <h1>Welcome to AgentClinic</h1>
      <p>AgentClinic — full-service wellness for AI agents</p>
      <p>The clinic is open and ready to serve your agents.</p>
    </Layout>
  )
})

serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log('AgentClinic is open for business on http://localhost:3000')
})
