import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogList from './BlogList';
import CreateBlogPost from './CreateBlogPost';
import RateBlog from './RateBlog'; 
import CommentScreen from './CommentScreen';
import UpdateBlogPost from './UpdateBlogPost'; 
import AuthScreen from './AuthScreen';
import Profile from './User';
import Feed from './Feed';
import AdminDashboard from './Admin';


const App = () => {
  return (
    <Router>
        <Routes>
        <Route path="/auth" element={<AuthScreen />} />
          <Route path="/" element={<BlogList />} />
          <Route path="/create-blog" element={<CreateBlogPost />} />
          <Route path="/rate-blog/:blogId" element={<RateBlog />} />
          <Route path="/comment/:blogId" element={<CommentScreen />} />
          <Route path="/update-blog/:blogId" element={<UpdateBlogPost />} /> 
          <Route path="/user" element={<Profile />} /> 
          <Route path="/feed" element={<Feed />} /> 
          <Route path="/admin" element={<AdminDashboard />} /> 

        </Routes>
    </Router>
  );
};

export default App;
