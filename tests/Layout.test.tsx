import { describe, it, expect } from 'vitest'
import { Layout } from '../src/components/Layout.js'

describe('Layout', () => {
  it('renders a full HTML document', () => {
    const html = String(<Layout />)
    expect(html).toContain('<html')
    expect(html).toContain('<head')
    expect(html).toContain('<body')
  })

  it('links PicoCSS and the local stylesheet', () => {
    const html = String(<Layout />)
    expect(html).toContain('pico')
    expect(html).toContain('styles.css')
  })

  it('includes header, nav, main, and footer', () => {
    const html = String(<Layout />)
    expect(html).toContain('<header')
    expect(html).toContain('<nav')
    expect(html).toContain('<main')
    expect(html).toContain('<footer')
  })

  it('nav links to agents and ailments', () => {
    const html = String(<Layout />)
    expect(html).toContain('href="/agents"')
    expect(html).toContain('href="/ailments"')
  })

  it('renders children inside main', () => {
    const html = String(<Layout><p>content</p></Layout>)
    expect(html).toContain('<p>content</p>')
  })

  it('uses the title prop in the page title', () => {
    const html = String(<Layout title="Agents" />)
    expect(html).toContain('Agents — AgentClinic')
  })

  it('falls back to AgentClinic when no title given', () => {
    const html = String(<Layout />)
    expect(html).toContain('<title>AgentClinic</title>')
  })
})
