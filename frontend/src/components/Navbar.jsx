import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <Link to="/">Hem</Link>
      <Link to="/login">Logga in</Link>
      <Link to="/register">Registrera</Link>
    </nav>
  )
}

export default Navbar