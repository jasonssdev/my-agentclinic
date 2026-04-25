import { describe, it, expect } from 'vitest'
import { Footer } from '../src/components/Footer.js'

describe('Footer', () => {
  it('renders a <footer> element', () => {
    const html = String(<Footer />)
    expect(html).toContain('<footer')
  })

  it('displays the clinic name', () => {
    const html = String(<Footer />)
    expect(html).toContain('AgentClinic')
  })

  it('displays the current year', () => {
    const html = String(<Footer />)
    expect(html).toContain(String(new Date().getFullYear()))
  })
})
