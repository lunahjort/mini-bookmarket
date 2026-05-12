import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [filtering, setFiltering] = useState(false)

  const fetchBooks = () => {
    setLoading(true)
    setFiltering(false)
    fetch('http://localhost:1337/api/books?populate=genre')
      .then(res => res.json())
      .then(data => {
        setBooks(data.data || [])
        setLoading(false)
      })
      .catch(() => {
        setError('Something went wrong, please try again')
        setLoading(false)
      })
  }

  const handleFilter = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    setFiltering(true)
  
    try {
        const res = await fetch(
            `http://localhost:1337/api/books-filter/by-price-range?min=${min}&max=${max}`
          )
      const data = await res.json()
      setBooks(data.data || [])
      setLoading(false)
    } catch {
      setError('Something went wrong, please try again')
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchBooks()
  }, [])

  if (loading) return <p>Loading books...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>Books</h1>

      <form onSubmit={handleFilter}>
        <input
          type="number"
          placeholder="Min price"
          value={min}
          onChange={e => setMin(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max price"
          value={max}
          onChange={e => setMax(e.target.value)}
        />
        <button type="submit">Filter</button>
        {filtering && (
          <button type="button" onClick={fetchBooks}>Clear filter</button>
        )}
      </form>

      {books.map(book => (
        <div key={book.id}>
          <Link to={`/books/${book.documentId}`}>
            <h2>{book.title}</h2>
          </Link>
          <p>{book.author}</p>
          <p>{book.price} €</p>
          <p>{book.genre?.name}</p>
        </div>
      ))}
    </div>
  )
}

export default Home