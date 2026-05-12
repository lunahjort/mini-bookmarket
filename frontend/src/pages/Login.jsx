import { useState } from 'react'

function Login() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
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
      <h1>Log in</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail or username"
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default Login