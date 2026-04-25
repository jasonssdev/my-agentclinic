import type { FC, PropsWithChildren } from 'hono/jsx'
import { Header } from './Header.js'
import { Nav } from './Nav.js'
import { Main } from './Main.js'
import { Footer } from './Footer.js'

type LayoutProps = PropsWithChildren<{ title?: string }>

export const Layout: FC<LayoutProps> = ({ children, title }) => {
  const pageTitle = title ? `${title} — AgentClinic` : 'AgentClinic'
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.classless.min.css"
        />
        <link rel="stylesheet" href="/public/styles.css" />
      </head>
      <body>
        <Header />
        <Nav />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  )
}
