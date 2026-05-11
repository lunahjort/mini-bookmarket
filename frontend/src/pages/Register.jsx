import { useState } from 'react'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      })
      const data = await res.json()

      if (data.error) {
        setError(data.error.message)
        return
      }

      localStorage.setItem('token', data.jwt)
      localStorage.setItem('user', JSON.stringify(data.user))
      window.location.href = '/'
    } catch (err) {
      setError('Something went wrong, try again')
    }
  }

  return (
    <div>
      <h1>Register</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register