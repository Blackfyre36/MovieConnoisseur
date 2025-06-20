
import './css/App.css'
import MovieCard from './components/MovieCard'
import NavBar from './components/NavBar'
import Favorites from './pages/Favorites'
import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContext'
import ProtectedRoute from './components/ProtectedRoute'
import AuthPage from './pages/AuthPage'

function App() {
  
  return (
    <div>
      <MovieProvider>
      <NavBar />
    <main className='main-content'>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/Favorites' element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
      </Routes>
    </main>
    </MovieProvider>
    </div>
  )
}

export default App
