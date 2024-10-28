import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Auth from './pages/Auth';
import ProfessorDetail from './pages/ProfessorDetails';

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false); // State to manage authentication status

  return (
    <Router>
      <Routes>
        {/* Redirect to HomePage if authenticated, otherwise go to Auth page */}
        {/* <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Auth setIsAuthenticated={setIsAuthenticated} />} /> */}
        <Route path='/auth' element={<Auth />}/>
        <Route path="/" element={<HomePage />} />
        <Route path="/professors/:id" element={<ProfessorDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

