import React, { useState, useEffect } from 'react';
import './BlogList.css'; 
import NavBar from './NavBar'; 
import CreateBlogPost from './CreateBlogPost'; 
import { Link } from 'react-router-dom';
import UpdateBlogPost from './UpdateBlogPost';

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateBlogPost, setShowCreateBlogPost] = useState(false);
  const [updateBlogId, setUpdateBlogId] = useState(null);

  const handleUpdateClick = (blogId) => {
    setUpdateBlogId(blogId);
  };

  const handleUpdate = () => {
    setCurrentPage(1); 

  };

  const handleCancelUpdate = () => {
    setUpdateBlogId(null);
  };
  const handleBlogPostCreated = () => {
    setCurrentPage(1); 
    setShowCreateBlogPost(false); 

};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/blogpost/all/users?page=${currentPage}&limit=7`, {
         
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error('error fetching blog data:', error.message);
      }
    };

    fetchData();
  }, [currentPage]);

 
  return (
    <>
   <style>
  @import url('https://fonts.googleapis.com/css2?family=Calistoga&family=EB+Garamond:ital,wght@1,500&family=IBM+Plex+Sans:wght@600&family=Marcellus&family=Montserrat:wght@100;500&family=Outfit&family=Poppins:ital@1&display=swap');
</style>
      <NavBar  />
      {showCreateBlogPost && <CreateBlogPost onBlogPostCreated={handleBlogPostCreated} />}
    
      <div className="blog-list-container">
        <div className="blog-list">
          {blogPosts.map((post) => (
            <div key={post._id} className="blog-post">
                 <img
                className="blog-post-image"
                src={post.image}// Replace with the URL to your image
                alt="Blog Post"
              />
              <h2>{post.title}</h2>
              <p>Author: {post.owner}</p>
              <p>{post.content}</p>
              <button className="delete-button"> ✖️</button>
                           
            <Link to={`/comment/${post._id}`}>
              <button className="comment-button"> 💬</button>
              </Link>
              <Link to={`/rate-blog/${post._id}`}>
                <button className="star-button"> ⭐</button>
              </Link>
              <button className="follow-button" >
                Follow
              </button>
            </div>
          ))}
        </div>
        {updateBlogId && (
        <UpdateBlogPost
          blogId={updateBlogId}
          onUpdate={handleUpdate}
          onCancel={handleCancelUpdate}
        />
      )}
        <div className="pagination">
          <button onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))} disabled={currentPage === 1}>
            Prev
          </button>
          <span>{currentPage}</span>
          <button onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>
            Next
          </button>
        </div>

      </div>
    </>
  );
};

export default BlogList;
