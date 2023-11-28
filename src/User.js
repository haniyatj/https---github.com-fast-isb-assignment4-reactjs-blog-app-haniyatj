import React, { useState, useEffect } from 'react';
import './User.css'; 
import { Link } from 'react-router-dom';
import UpdateBlogPost from './UpdateBlogPost';
import useTokenStore from './tokenStore';
import FollowersList from './follow';
import useRatedStore from './ratedStore';
import useCommentsStore from './commentsStore';

const Profile = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [updateBlogId, setUpdateBlogId] = useState(null);
  const { token, decodeToken } = useTokenStore();
  const { ratedBlogId } = useRatedStore();
  const { commentedBlogId } = useCommentsStore();
  const handleUpdateClick = (blogId) => {
    setUpdateBlogId(blogId);
  };

  const handleUpdate = () => {
    setCurrentPage(1); 

  };

  const handleCancelUpdate = () => {
    setUpdateBlogId(null);
  };
  const handleDelete = async (blogId) => {
    try {
      const response = await fetch(`http://localhost:3000/blogpost/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete the blog post');
      }

      setBlogPosts((prevPosts) => prevPosts.filter((post) => post._id !== blogId));
    } catch (error) {
      console.error('Error deleting blog post:', error);
      window.alert('Failed to delete the blog post. Please try again.'); // Add an alert
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Token at the beginning:", token); 
        const decodedToken = decodeToken();
       console.log("Decoded Token:", decodedToken); 

        if (!token) {
          console.error('Token is missing. User might not be authenticated.');
          return;
        }
  
        const response = await fetch(`http://localhost:3000/blogpost?page=${currentPage}&limit=7&author=${decodedToken.username}`, {
         
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setBlogPosts(data.docs);

        
      } catch (error) {
        console.error('Error fetching blog data:', error.message);
        setBlogPosts([]);

      }
    };
  
    fetchData();
  }, [currentPage,token,decodeToken,ratedBlogId,commentedBlogId]);

 
  return (
    <>
   <style>
  @import url('https://fonts.googleapis.com/css2?family=Calistoga&family=EB+Garamond:ital,wght@1,500&family=IBM+Plex+Sans:wght@600&family=Marcellus&family=Montserrat:wght@100;500&family=Outfit&family=Poppins:ital@1&display=swap');
</style>
    <FollowersList/>
      <div className="blog-list-container">
        <div className="blog-list">
          {blogPosts.map((post) => (
            <div key={post._id} className="blog-post">
                 <img
                className="blog-post-image"
                src={post.image}
                alt="Blog Post"
              />
              <h2>{post.title}</h2>
              <p>Author: {post.owner}</p>
              <p>Created At:{post.createdAt}</p>
              <p>{post.content}</p>
              <p>Ratings: {post.ratings.map((rating) => rating.rating).join(", ")}</p>
                <p>
                  Comments:
                  {post.comments.map((comment) => (
                    <div key={comment._id}>
                      <p>{comment.text}</p>
                      <p>By: {comment.user}</p>
                    </div>
                  ))}
                </p>
              <button className="delete-button" onClick={() => handleDelete(post._id)}> ✖️</button>
              <Link to={`/update-blog/${post._id}`}> 
              <button className="update-button"  onClick={() => handleUpdateClick(post._id)}>✏️</button>
            </Link>              
           
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

export default Profile;