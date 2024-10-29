import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import ProfessorDetail from './ProfessorDetails';
import NavBar from '../components/NavBar';

function HomePage() {
  const { user } = useUser();
  const [prof, setProf] = useState([]);
  const [selectedProf, setSelectedProf] = useState(null); // Store selected professor details
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/professors');
        setProf(res.data);
      } catch (error) {
        setError('Error fetching professors');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfessors();
  }, []);

  const handleSelectProfessor = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/professors/${id}`);
      setSelectedProf(res.data);
      setError(null);
    } catch (error) {
      setError('Error fetching professor details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <NavBar />
    <div className='home-page-container'>
      <h1>Welcome {user?.firstName}! to the Rate Your Professor app</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <select onChange={(e) => handleSelectProfessor(e.target.value)}>
        <option>Select a professor</option>
        {prof.map((prof) => (
          <option key={prof._id} value={prof._id}>
            {prof.name} - {prof.department}
          </option>
        ))}
      </select>

      {selectedProf && (
        <ProfessorDetail professor={selectedProf} onRatingAdded={handleSelectProfessor} />
      )}
    </div>
    </>
  );
}

export default HomePage;
