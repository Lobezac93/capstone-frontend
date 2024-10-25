import { useState } from 'react'

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Auth from './pages/Auth'



function App() {
  

  return (
    <>

      <Router>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/auth' element={<Auth />}/>
        </Routes>
      </Router>
      
    </>
  )
}

export default App
