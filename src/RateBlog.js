import React, { useState } from 'react';
import { useNavigate ,useParams } from 'react-router-dom';
import './RateBlog.css';
import useTokenStore from './tokenStore';
import useRatedStore from './ratedStore'; 
const RateBlog = () => {

  const { postId } = useParams();
  const { setRatedBlogId } = useRatedStore(); 
  const [rating, setRating] = useState('');
  const navigate = useNavigate(); 
  const { token, decodeToken } = useTokenStore();

  const handleRate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/blogpost/rate/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
 
        },
        body: JSON.stringify({ rating: parseInt(rating, 10) }),
      });

      if (!response.ok) {
        throw new Error('Failed to rate the blog post');
      }

      const updatedBlogPost = await response.json();
      setRatedBlogId(postId);

     
      navigate('/'); 
    } catch (error) {
      console.error('Error rating blog post:', error);
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
