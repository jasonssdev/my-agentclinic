import { serve } from '@hono/node-server'
import app from './app.js'

serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log('AgentClinic is open for business on http://localhost:3000')
})
