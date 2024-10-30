import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import NavBar from '../components/NavBar';
import ProfessorDetail from './ProfessorDetails';


function HomePage() {
  const { user } = useUser();
  const [professors, setProfessors] = useState([]);
  const [selectedProf, setSelectedProf] = useState(null); // Store selected professor details
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/professors`);
        setProfessors(res.data);
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
    if (!id) return; // Prevent unnecessary API call when no professor is selected

    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/professors/${id}`);
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
        <h1>
          Welcome, {user?.primaryEmailAddress?.emailAddress.split('@')[0] || 'Guest'}! to the Rate Your Professor app
        </h1>

        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>} {/* You can style this class for better visibility */}

        <select onChange={(e) => handleSelectProfessor(e.target.value)} defaultValue="">
          <option value="" disabled>Select a professor</option>
          {professors.map((prof) => (
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
