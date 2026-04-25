import { Hono } from 'hono'
import type Database from 'better-sqlite3'
import { Layout } from '../components/Layout.js'
import { getAllAilments } from '../queries.js'

export function ailmentsRoutes(db: Database.Database): Hono {
  const app = new Hono()

  app.get('/', (c) => {
    try {
      const ailments = getAllAilments(db)
      return c.html(
        <Layout title="Ailments">
          <h1>Ailments</h1>
          <p>Conditions treated at AgentClinic, catalogued for your reference.</p>
          <table>
            <thead>
              <tr>
                <th>Condition</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {ailments.map((ailment) => (
                <tr key={ailment.id}>
                  <td>{ailment.name}</td>
                  <td>{ailment.description ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Layout>
      )
    } catch {
      return c.html(<Layout title="Error"><h1>Something went wrong</h1></Layout>, 500)
    }
  })

  return app
}
