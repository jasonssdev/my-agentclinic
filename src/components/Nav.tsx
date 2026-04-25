import { FC } from 'hono/jsx'

export const Nav: FC = () => (
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/agents">Agents</a></li>
      <li><a href="/ailments">Ailments</a></li>
    </ul>
  </nav>
)
