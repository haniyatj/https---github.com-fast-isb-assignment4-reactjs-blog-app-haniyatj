import React, { useState } from 'react';
import useUserStore from './userStore';
import './UpdateUser.css'; 
import useTokenStore from './tokenStore';

const UpdateUser = () => {
  const { user, setUser } = useUserStore();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    password: user?.password || '',
    email: user?.email || '',
    type: user?.type || '',
  });
  const { token, decodeToken } = useTokenStore();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://your-api-url/update/${user._id}`, {
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

      setUser({ ...user, ...formData }); // Update local Zustand store
      alert('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  return (
    <div className="update-user-container">
      <h2>Update User</h2>
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

    
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
