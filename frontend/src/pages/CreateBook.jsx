import { useState } from 'react'

function CreateBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const token = localStorage.getItem('token')

    try {
      const res = await fetch('http://localhost:1337/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          data: { title, author, price: parseFloat(price), description }
        })
      })
      const data = await res.json()

      if (data.error) {
        setError(data.error.message)
        return
      }

      window.location.href = '/'
    } catch (err) {
      setError('Something went wrong, try again')
    }
  }

  return (
    <div>
      <h1>Add a book</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type="submit">Create Book</button>
      </form>
    </div>
  )
}

export default CreateBook