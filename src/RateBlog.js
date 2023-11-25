import React, { useState } from 'react';
import { useNavigate ,useParams } from 'react-router-dom';
import './RateBlog.css';
const RateBlog = ({ blogId, onClose, onRate }) => {

  const { postId } = useParams();

  const [rating, setRating] = useState('');
  const navigate = useNavigate(); // Get the navigate function

  const handleRate = async () => {
    try {
      // Send a request to the server to rate the blog post
      const response = await fetch(`http://localhost:3000/blogpost/rate/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjU1MDU3MTczYzAyMDc5NTBlYTMxZjcyIiwidXNlcm5hbWUiOiJ0YXlsb3Jzd2lmdCIsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNzAwOTA1OTE0LCJleHAiOjE3MDExNTQzMTR9.NMnx1SExsKaEZDI3-LY5D9rWR_U1IWLJyoqsBiDHs6c', // Replace with your actual access token
        },
        body: JSON.stringify({ rating: parseInt(rating, 10) }),
      });

      if (!response.ok) {
        throw new Error('Failed to rate the blog post');
      }

      // Assuming the server responds with the updated blog post data
      const updatedBlogPost = await response.json();

      // Call the 'onRate' prop to pass the rating and updated data to the parent component
     // onRate(updatedBlogPost);
      navigate('/'); 
      //onClose();
    } catch (error) {
      console.error('Error rating blog post:', error);
      // Handle error, you might want to show a user-friendly error message
    }
  };

  return (
    <div className="rate-blog-popup">
      <h2>Rate this Blog!</h2>
      <label htmlFor="rating">Rating:</label>
      <input
        type="number"
        id="rating"
        name="rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      />
      <button onClick={handleRate}>Rate</button>
    </div>
  );
};

export default RateBlog;
