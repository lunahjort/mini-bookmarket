import { useState, useEffect } from 'react'

function Home() {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('http://localhost:1337/api/books?populate=genre')
        .then(res => res.json ())
        .then(data => {
            setBooks(data.data)
            setLoading(false)
        })
        .catch(err => {
            setError('Something went wrong, try again')
            setLoading(false)
        })
    }, [])

    if (loading) return <p>Loading books...</p>
    if (error) return <p>{error}</p>
    return (
        <div>
            <h1>Books</h1>
            {books.map(book => (
                <div key={book.id}>
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                    <p>{book.price} €</p>
                    <p>{book.genre?.name}</p>
                </div>
            ))}
        </div>
    )
}

export default Home