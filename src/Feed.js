import React, { useState, useEffect } from 'react';
import './BlogList.css'; 
import NavBar from './NavBar'; 
import CreateBlogPost from './CreateBlogPost'; 
import { Link } from 'react-router-dom';
import UpdateBlogPost from './UpdateBlogPost';
import useTokenStore from './tokenStore';
import useFeedStore from './FeedStore';

const Feed = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateBlogPost, setShowCreateBlogPost] = useState(false);

  const { token, decodeToken } = useTokenStore();
  const { feed, loadFeed } = useFeedStore();

 
  const handleUpdate = () => {
    setCurrentPage(1); 

  };

 
  const handleBlogPostCreated = () => {
    setCurrentPage(1); 
    setShowCreateBlogPost(false); 

};

useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Calling loadFeed function');

        const decodedToken = decodeToken();
        const username = decodedToken.username;

        await loadFeed(username,token);
        console.log('Feed data after loadFeed:', feed);

       
      } catch (error) {
        console.error('Error fetching blog data:', error.message);
      }
    };

    fetchData();
  }, [currentPage, decodeToken, loadFeed]);

 
  return (
    <>
   <style>
  @import url('https://fonts.googleapis.com/css2?family=Calistoga&family=EB+Garamond:ital,wght@1,500&family=IBM+Plex+Sans:wght@600&family=Marcellus&family=Montserrat:wght@100;500&family=Outfit&family=Poppins:ital@1&display=swap');
</style>
      <NavBar  />
      {showCreateBlogPost && <CreateBlogPost onBlogPostCreated={handleBlogPostCreated} />}
    
      <div className="blog-list-container">
        <div className="blog-list">
          {feed.map((post) => (
            <div key={post._id} className="blog-post">
                 <img
                className="blog-post-image"
                src={post.image}
                alt="Blog Post"
              />
              <h2>{post.title}</h2>
              <p>Author: {post.owner}</p>
              <p>{post.content}</p>
                           
            <Link to={`/comment/${post._id}`}>
              <button className="comment-button"> 💬</button>
              </Link>
              <Link to={`/rate-blog/${post._id}`}>
                <button className="star-button"> ⭐</button>
              </Link>
            
            </div>
          ))}
        </div>
       

      </div>
    </>
  );
};

export default Feed;
