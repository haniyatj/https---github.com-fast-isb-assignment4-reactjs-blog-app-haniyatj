import React, { useState, useEffect } from 'react';
import './BlogList.css'; 
import NavBar from './NavBar'; 
import CreateBlogPost from './CreateBlogPost'; 
import { Link } from 'react-router-dom';
import UpdateBlogPost from './UpdateBlogPost';
import useTokenStore from './tokenStore';
import useFeedStore from './FeedStore';
import useFollowStore from './followStore';
import useSearchStore from './searchStore';

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [updateBlogId, setUpdateBlogId] = useState(null);
  const { token, decodeToken,newPostCreated, setNewPostCreated } = useTokenStore();
  const { feed, loadFeed } = useFeedStore();
  const { followers ,following,loadFollowData} = useFollowStore();
  const { keywords, category, author, sortBy, sortOrder, updateSearchOptions } = useSearchStore(); // Use the search store

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url =  `http://localhost:3000/blogpost/all/users`;
      

        if ( keywords && keywords.trim() !== '') {
          console.log("boo")
          url = `http://localhost:3000/search?keywords=${keywords}&category=${category}&author=${author}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${currentPage}`;
        }

        if (newPostCreated) {
          // If a new post has been created, reset the flag and refetch data
          setNewPostCreated(false);
         // fetchData();
        }

        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('BlogList - Fetched Data:', data);

      

        setBlogPosts(data);
      } catch (error) {
        console.error('error fetching blog data:', error.message);
        setBlogPosts([]);

      }
    };

    fetchData();
  }, [currentPage, keywords, category, author, sortBy, sortOrder]);

  const handleFollow = async (blogger) => {
    try {
      const response = await fetch(`http://localhost:3000/users/follow/${blogger}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to follow blogger');
      }
      const decodedToken = decodeToken();
      const username = decodedToken.username;
      window.alert("followed!");
      await loadFeed(username, token);
      await loadFollowData(username, token);


    //  setBlogPosts([]); // Clear existing posts
      setCurrentPage(1); // Reload posts
    } catch (error) {
      console.error('Error following blogger:', error.message);
    }
  };
  console.log('blogPosts:', blogPosts);

  return (
    <>
   <style>
  @import url('https://fonts.googleapis.com/css2?family=Calistoga&family=EB+Garamond:ital,wght@1,500&family=IBM+Plex+Sans:wght@600&family=Marcellus&family=Montserrat:wght@100;500&family=Outfit&family=Poppins:ital@1&display=swap');
</style>
      <NavBar  />
    
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
              <p>{post.content}</p>
              <button className="delete-button"> ✖️</button>
                           
            <Link to={`/comment/${post._id}`}>
              <button className="comment-button"> 💬</button>
              </Link>
              <Link to={`/rate-blog/${post._id}`}>
                <button className="star-button"> ⭐</button>
              </Link>
              <button className="follow-button" onClick={() => handleFollow(post.owner)} >
                Follow
              </button>
            </div>
          ))}
        </div>
      
       

      </div>
    </>
  );
};

export default BlogList;
