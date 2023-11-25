// NavBar.js
import React from 'react';
import './NavBar.css';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const NavBar = () => {

  const navigate = useNavigate();

  const handleProfileClick = () => {
    // Add any additional logic if needed
    navigate('/user');
  };
  return (
    <nav className="navbar">
      <div className='yes'>
        <Link className="navbar-item" to="/create-blog">Create Blog</Link>
        <Link className="navbar-item" to="/auth">Register</Link>
        </div>

      <SearchBar />
      <div className="profile-icon"  onClick={handleProfileClick}>
        <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="Profile Icon" />
      </div>
    </nav>
  );
};

export default NavBar;