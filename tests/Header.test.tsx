import { describe, it, expect } from 'vitest'
import { Header } from '../src/components/Header.js'

describe('Header', () => {
  it('renders a <header> element', () => {
    const html = String(<Header />)
    expect(html).toContain('<header')
  })

  it('contains a home link pointing to /', () => {
    const html = String(<Header />)
    expect(html).toContain('href="/"')
  })

  it('displays the clinic name', () => {
    const html = String(<Header />)
    expect(html).toContain('AgentClinic')
  })
})
