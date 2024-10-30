import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Auth from "./pages/Auth";
import ProfessorDetail from "./pages/ProfessorDetails";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom'


function App() {
  const [isAuthenticated, setIs] = useState(false)
  const {userId, isLoaded} =useAuth()
  const navigate = useNavigate()
  console.log('userID',userId)

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/auth')
    }
  }, [isLoaded])
  return (
    
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route path="/auth" element={<Auth />} />
       

        <Route
          path="/professors/:id"
          element={<ProfessorDetail/>}/>
        
      </Routes>
    
  );
}

export default App;
