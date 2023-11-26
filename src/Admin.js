import React, { useEffect } from 'react';
import './Admin.css'; 
import useAdminStore from './adminStore';
import useTokenStore from './tokenStore';

const AdminDashboard = () => {
  const { users, blogPosts, setUsers, setBlogPosts } = useAdminStore();
  const { token, decodeToken } = useTokenStore();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    const fetchBlogPostData = async () => {
      try {
        const response = await fetch('http://localhost:3000/blogpost/admin/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }

        const data = await response.json();
        setBlogPosts(data.blogPost);
      } catch (error) {
        console.error('Error fetching blog post data:', error.message);
      }
    };

    fetchUserData();
    fetchBlogPostData();
  }, [setUsers, setBlogPosts]);

  const handleDisableUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}/block`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,        },
      });

      if (!response.ok) {
        throw new Error('Failed to disable user');
      }

      // Update the users list after successful disable
      window.alert("user disabled");
      setUsers((prevUsers) => prevUsers.map((user) => (user._id === userId ? { ...user, isBlocked: true } : user)));
    } catch (error) {
      console.error('Error disabling user:', error.message);
    }
  };

  const handleDisableBlogPost = async (blogPostId) => {
    try {
      const response = await fetch(`http://localhost:3000/blogpost/${blogPostId}/block`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,        },
      });

      if (!response.ok) {
        throw new Error('Failed to disable blog post');
      }
      window.alert("post disabled");
      // Update the blogPosts list after successful disable
      setBlogPosts((prevBlogPosts) =>
        prevBlogPosts.map((post) => (post._id === blogPostId ? { ...post, isBlocked: true } : post))
      );
    } catch (error) {
      console.error('Error disabling blog post:', error.message);
    }
  };
  return (
    <div className="admin-dashboard-container">
      <div className="user-list">
        <h2>User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.username}{' '}
              <button onClick={() => handleDisableUser(user._id)}>Disable</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="blog-post-list">
        <h2>Blog Post List</h2>
        <ul>
          {blogPosts.map((post) => (
            <li key={post._id}>
              {post.title}{' '}
              <button onClick={() => handleDisableBlogPost(post._id)}>Disable</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
