import React, { useState } from 'react';
import useUserStore from './userStore';
import './UpdateUser.css'; 
import useTokenStore from './tokenStore';
import { useNavigate,useParams  } from 'react-router-dom';

const UpdateUser = () => {
  const { user, setUser } = useUserStore();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    password: user?.password || '',
    email: user?.email || '',
    type: user?.type || '',
  });
  const { token, decodeToken } = useTokenStore();
  const navigate = useNavigate();
  const { userId } = useParams();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,

        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      setUser({ ...user, ...formData }); 
      alert('User updated successfully');
      navigate('/');

    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  return (
    <div className="update-user-container">
      <h2>Update Profile</h2>
      <form className="update-user-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

    
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
