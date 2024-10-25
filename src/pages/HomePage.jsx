import React from 'react';
import axios from 'axios'
import { useUser } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';

function HomePage() {
  const { user } = useUser();
  const [prof, setProf] = useState([])
  const[error, setError] = useState(null)
  const[loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchProfessors = async ()=> {
      try {
        const res = await axios.get('http://localhost:5000/api/professors')
        console.log(res.data)
        setProf(res.data)
      } catch (error) {
        setError('Error fetching professors')
        console.error(error)
      } finally {
        setLoading(false)
      }
    } 
    
    fetchProfessors()
  },[])


  if (!user) {
    return <div>Loading...</div>; 
  }

  if (loading){
    return <p>Loading professors....</p>
  }

  if(error) {
    return<p>{error}</p>
  }

  return (
    <div className='home-page-container'>
      <h1>Welcome {user.firstName}! to the Rate Your Professor app</h1>
      <select>
        <option>Select a professor</option>
        {prof.map((prof) => (
          <option key={prof._id}>{prof.name} -{prof.department}</option>
        ))}
      </select>
      <button>search</button>
    </div>
  );
}

export default HomePage;


