import { describe, it, expect } from 'vitest'
import { Layout } from '../src/components/Layout.js'

describe('Layout', () => {
  it('renders a full HTML document', () => {
    const html = String(<Layout />)
    expect(html).toContain('<html')
    expect(html).toContain('<head')
    expect(html).toContain('<body')
  })

  it('links the stylesheet', () => {
    const html = String(<Layout />)
    expect(html).toContain('rel="stylesheet"')
    expect(html).toContain('style.css')
  })

  it('includes header, main, and footer', () => {
    const html = String(<Layout />)
    expect(html).toContain('<header')
    expect(html).toContain('<main')
    expect(html).toContain('<footer')
  })

  it('renders children inside main', () => {
    const html = String(<Layout><p>content</p></Layout>)
    expect(html).toContain('<p>content</p>')
  })
})
