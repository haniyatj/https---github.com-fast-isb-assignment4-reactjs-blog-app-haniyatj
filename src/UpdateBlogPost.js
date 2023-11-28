import React, { useState, useEffect } from 'react';
import { useNavigate ,useParams  } from 'react-router-dom';
import './UpdateBlogPost.css';
import useTokenStore from './tokenStore';
import useBlogStore from './blogStore';


const UpdateBlogPost = () => {

  const navigate = useNavigate(); 
  const token = useTokenStore((state) => state.token);

  const { setSelectedBlogPost } = useBlogStore();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const handleUpdate = async () => {
    try {

      const response = await fetch(`http://localhost:3000/blogpost/${id}`, {
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
      window.alert('updated!'); 

      const result = await response.json();

      setSelectedBlogPost(result);

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
    </div>
  );
};

export default UpdateBlogPost;
