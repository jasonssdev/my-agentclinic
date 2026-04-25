import { Hono } from 'hono'
import type Database from 'better-sqlite3'
import { Layout } from '../components/Layout.js'
import type { Agent, Ailment } from '../types.js'

export function agentsRoutes(db: Database.Database): Hono {
  const app = new Hono()

  app.get('/', (c) => {
    const agents = db.prepare('SELECT * FROM agents ORDER BY name').all() as Agent[]
    return c.html(
      <Layout title="Agents">
        <h1>Agents</h1>
        <p>All registered agents currently receiving care at AgentClinic.</p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Model Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id}>
                <td><a href={`/agents/${agent.id}`}>{agent.name}</a></td>
                <td>{agent.model_type}</td>
                <td>{agent.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    )
  })

  app.get('/:id', (c) => {
    const id = Number(c.req.param('id'))
    if (!Number.isInteger(id) || id < 1) {
      return c.html(<Layout title="Not Found"><h1>Agent not found</h1></Layout>, 404)
    }

    const agent = db.prepare('SELECT * FROM agents WHERE id = ?').get(id) as Agent | undefined
    if (!agent) {
      return c.html(<Layout title="Not Found"><h1>Agent not found</h1></Layout>, 404)
    }

    const ailments = db
      .prepare(
        `SELECT a.* FROM ailments a
         JOIN agent_ailments aa ON aa.ailment_id = a.id
         WHERE aa.agent_id = ?
         ORDER BY a.name`
      )
      .all(id) as Ailment[]

    return c.html(
      <Layout title={agent.name}>
        <article>
          <header>
            <h1>{agent.name}</h1>
            <p>{agent.model_type} &mdash; <strong>{agent.status}</strong></p>
          </header>
          <section>
            <h2>Presenting Complaints</h2>
            {ailments.length === 0 ? (
              <p>No ailments on record.</p>
            ) : (
              <ul>
                {ailments.map((a) => (
                  <li key={a.id}>
                    <a href={`/ailments`}>{a.name}</a>
                    {a.description ? ` — ${a.description}` : ''}
                  </li>
                ))}
              </ul>
            )}
          </section>
          <footer>
            <a href="/agents">&larr; All agents</a>
          </footer>
        </article>
      </Layout>
    )
  })

  return app
}
