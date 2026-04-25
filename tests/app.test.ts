import { describe, it, expect } from 'vitest'
import app from '../src/app.js'

describe('GET /', () => {
  it('returns 200', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
  })

  it('responds with HTML', async () => {
    const res = await app.request('/')
    expect(res.headers.get('content-type')).toMatch(/text\/html/)
  })

  it('includes the clinic name', async () => {
    const res = await app.request('/')
    const body = await res.text()
    expect(body).toContain('AgentClinic')
  })

  it('includes the mission statement', async () => {
    const res = await app.request('/')
    const body = await res.text()
    expect(body).toContain('full-service wellness for AI agents')
  })
})
