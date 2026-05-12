import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function BookDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch(`http://localhost:1337/api/books/${id}?populate=genre&populate=createdBy`)
      .then(res => res.json())
      .then(data => {
        setBook(data.data)
        setTitle(data.data.title)
        setAuthor(data.data.author)
        setPrice(data.data.price)
        setDescription(data.data.description)
        setLoading(false)
      })
      .catch(() => {
        setError('Something went wrong, try again')
        setLoading(false)
      })
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete the book?')) return

    try {
      await fetch(`http://localhost:1337/api/books/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      navigate('/')
    } catch {
      setError('Something went wrong with the removal')
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`http://localhost:1337/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          data: { title, author, price: parseFloat(price), description }
        })
      })
      const data = await res.json()
      setBook(data.data)
      setEditing(false)
    } catch {
      setError('Something went wrong with the update')
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!book) return <p>The book was not found</p>

  return (
    <div>
      {editing ? (
        <form onSubmit={handleUpdate}>
          <input value={title} onChange={e => setTitle(e.target.value)} />
          <input value={author} onChange={e => setAuthor(e.target.value)} />
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h1>{book.title}</h1>
          <p>Author: {book.author}</p>
          <p>Price: {book.price} kr</p>
          <p>Genre: {book.genre?.name}</p>
          <p>Condition: {book.condition}</p>
          <p>{book.description}</p>
          <p>Seller: {book.createdBy?.username}</p>
          {user && (
            <>
              <button onClick={() => setEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default BookDetail