import React, { useState } from 'react';
import axios from 'axios';
import '../css/ProfessorDetails.css';

function ProfessorDetail({ professor, onRatingAdded }) {
  const [newRating, setNewRating] = useState({
    rating: '',
    difficulty: '',
    wouldTakeAgain: '',
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
      onRatingAdded(professor._id);

      setNewRating({
        rating: '',
        difficulty: '',
        wouldTakeAgain: '',
        comment: '',
      });
      setError(null);
    } catch (error) {
      setError('Error adding rating');
      console.error(error);
    }
  };

  const getRatingSummary = () => {
    const totalRatings = professor.ratings.length;
    if (totalRatings === 0) return { averageRating: 0, averageDifficulty: 0, percentWouldTakeAgain: 0 };

    const totalRatingValue = professor.ratings.reduce((acc, rating) => acc + rating.rating, 0);
    const totalDifficultyValue = professor.ratings.reduce((acc, rating) => acc + rating.difficulty, 0);
    const wouldTakeAgainCount = professor.ratings.filter(rating => rating.wouldTakeAgain === 'yes').length;

    return {
      averageRating: (totalRatingValue / totalRatings).toFixed(2),
      averageDifficulty: (totalDifficultyValue / totalRatings).toFixed(2),
      percentWouldTakeAgain: ((wouldTakeAgainCount / totalRatings) * 100).toFixed(0),
    };
  };

  const { averageRating, averageDifficulty, percentWouldTakeAgain } = getRatingSummary();

  return (
    <div className="professor-details">
      <h2>{professor.name} - {professor.department}</h2>

      <div className="rating-summary">
        <h3>Ratings Summary:</h3>
        <p>Average Rating: {averageRating}</p>
        <p>Average Difficulty: {averageDifficulty}</p>
        <p>Would Take Again: {percentWouldTakeAgain}%</p>
      </div>

      <div className="rating-list">
        <h3>Ratings:</h3>
        <ul>
          {professor.ratings.map((rating) => (
            <li key={rating._id}>
              <p>Rating: {rating.rating}</p>
              <p>Difficulty: {rating.difficulty}</p>
              <p>Would Take Again: {rating.wouldTakeAgain === 'yes' ? 'Yes' : 'No'}</p>
              <p>Comment: {rating.comment}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="add-rating">
        <h3>Add a New Rating:</h3>
        {error && <p className="error-message">{error}</p>}

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
        <div className="radio-group">
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
        </div>

        <textarea
          name="comment"
          placeholder="Add a comment"
          value={newRating.comment}
          onChange={handleChange}
          rows="4"
        />
        <button onClick={handleAddRating}>Submit Rating</button>
      </div>
    </div>
  );
}

export default ProfessorDetail;
