import { Link } from 'react-router-dom'

function Navbar() {
  const user = localStorage.getItem('user')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/books/create">Add a book</Link>
          <button onClick={handleLogout}>Log out</button>
        </>
      ) : (
        <>
          <Link to="/login">Log in</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  )
}

export default Navbar