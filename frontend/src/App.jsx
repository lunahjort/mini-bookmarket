import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BookDetail from './pages/BookDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateBook from './pages/CreateBook'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books/create" element={<CreateBook />} />
      </Routes>
    </>
  )
}

export default App