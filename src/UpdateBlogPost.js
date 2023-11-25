// UpdateBlogPost.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateBlogPost.css';
import useTokenStore from './tokenStore';
const UpdateBlogPost = ({ blogId, onUpdate, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate(); 
  const token = useTokenStore((state) => state.token);

  const handleUpdate = async () => {
    try {

      const response = await fetch(`http://localhost:3000/blogpost/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
                },
        body: JSON.stringify({ title, content, image }),
      });

      if (!response.ok) {
        throw new Error('Failed to update the blog post');
      }

      const result = await response.json();

      onUpdate();
      navigate('/user');

      
    } catch (error) {
      console.error('Error updating blog post:', error);
      window.alert('Failed to update the blog post. Please try again.'); 

    }
  };

  return (
    <div className="update-blog-post-container">
      <h2>Update Blog Post</h2>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <label htmlFor="image">Image URL:</label>
      <input
        type="text"
        id="image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
      <button  className="cancel-button" onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default UpdateBlogPost;
