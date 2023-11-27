// CreateBlogPost.js
import React, { useState } from 'react';
import './CreateBlogPost.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import useTokenStore from './tokenStore';

const CreateBlogPost = () => {

    const navigate = useNavigate();
    const { token, setNewPostCreated } = useTokenStore();


  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'none',
    image: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const createResponse = await fetch('http://localhost:3000/blogpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,

        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          category: formData.category,
          image:formData.image
        }),
      });
  
      if (!createResponse.ok) {
        throw new Error('Failed to create blog post');
      }
  
      const createdBlogPost = await createResponse.json();
      console.log('Blog post created:', createdBlogPost);

      setNewPostCreated(true);


      navigate('/');

  
    } catch (error) {
      console.error('Error creating blog post:', error.message);
    }
  };

  return (
    <div className="create-blog-container">
      <h2>Create a Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <label htmlFor="image">Image:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
        

        <button type="submit">Create Blog Post</button>
      </form>
    </div>
  );
};

export default CreateBlogPost;