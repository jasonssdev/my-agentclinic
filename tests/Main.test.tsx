import { describe, it, expect } from 'vitest'
import { Main } from '../src/components/Main.js'

describe('Main', () => {
  it('renders a <main> element', () => {
    const html = String(<Main />)
    expect(html).toContain('<main')
  })

  it('renders children inside <main>', () => {
    const html = String(<Main><p>hello</p></Main>)
    expect(html).toContain('<main')
    expect(html).toContain('<p>hello</p>')
    expect(html).toContain('</main>')
  })

  it('renders without children', () => {
    const html = String(<Main />)
    expect(html).toBe('<main></main>')
  })
})
