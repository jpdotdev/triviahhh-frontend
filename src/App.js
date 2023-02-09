import React from 'react'
import {Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import './App.css';
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Quiz from "./components/Quiz"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Scores from './pages/Scores'
import Footer from './components/Footer'



function App() {

  const { user } = useAuthContext()

  return (
      <div className="App">
        <Navbar />
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to='/login' />} />
            <Route path="/quizzes" element={<Quiz />} />
            <Route path="/scores" element={user ? <Scores /> : <Navigate to='/' />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
          </Routes>
        <Footer />
      </div>
  );
}

export default App;
