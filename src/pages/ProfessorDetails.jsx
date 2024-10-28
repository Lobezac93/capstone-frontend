import React, { useState } from 'react';
import axios from 'axios';

function ProfessorDetail({ professor, onRatingAdded }) {
  const [newRating, setNewRating] = useState({
    rating: '',
    difficulty: '',
    wouldTakeAgain: '', // Changed to a string to represent "yes" or "no"
    comment: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRating((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRating = async () => {
    try {
      await axios.post(`http://localhost:5000/api/ratings`, {
        ...newRating,
        professor: professor._id,
      });
      onRatingAdded(professor._id); // Refresh professor details after adding rating

      // Clear the input fields after submitting
      setNewRating({
        rating: '',
        difficulty: '',
        wouldTakeAgain: '',
        comment: '',
      });
    } catch (error) {
      setError('Error adding rating');
      console.error(error);
    }
  };

  return (
    <div className='professor-details'>
      <h2>{professor.name} - {professor.department}</h2>
      <h3>Ratings:</h3>
      <ul>
        {professor.ratings.map((rating) => (
          <li key={rating._id}>
            <p>Rating: {rating.rating}</p>
            <p>Difficulty: {rating.difficulty}</p>
            <p>Would Take Again: {rating.wouldTakeAgain ? 'Yes' : 'No'}</p>
            <p>Comment: {rating.comment}</p>
          </li>
        ))}
      </ul>

      <h3>Add a New Rating:</h3>
      {error && <p>{error}</p>}
      <input
        type="number"
        name="rating"
        placeholder="Rating (1-5)"
        value={newRating.rating}
        onChange={handleChange}
        min="1"
        max="5"
        required
      />
      <input
        type="number"
        name="difficulty"
        placeholder="Difficulty (1-5)"
        value={newRating.difficulty}
        onChange={handleChange}
        min="1"
        max="5"
        required
      />

      <h4>Would Take Again:</h4>
      <label>
        <input
          type="radio"
          name="wouldTakeAgain"
          value="yes"
          checked={newRating.wouldTakeAgain === 'yes'}
          onChange={handleChange}
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          name="wouldTakeAgain"
          value="no"
          checked={newRating.wouldTakeAgain === 'no'}
          onChange={handleChange}
        />
        No
      </label>

      <textarea
        name="comment"
        placeholder="Add a comment"
        value={newRating.comment}
        onChange={handleChange}
      />
      <button onClick={handleAddRating}>Submit Rating</button>
    </div>
  );
}

export default ProfessorDetail;
