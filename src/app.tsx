import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { Layout } from './components/Layout.js'

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

export default app
