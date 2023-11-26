import useFollowStore from './followStore';
import useTokenStore from './tokenStore';
import React, { useEffect } from 'react';
import './follow.css'

const FollowersList = () => {
  const { followers ,following,loadFollowData} = useFollowStore();
  const { token, decodeToken } = useTokenStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decodedToken = decodeToken();
        const username = decodedToken.username;

        await loadFollowData(username,token);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchData();
  }, [decodeToken, loadFollowData]);
  return (
    <div className="followers-list-container">
      <div className="follow-list">
        <h2 className="list-title">Followers List</h2>
        <ul className="list-items">
          {followers.map((user) => (
            <li key={user.username}>{user.username}</li>
          ))}
        </ul>
      </div>
      <div className="follow-list">
        <h2 className="list-title">Following List</h2>
        <ul className="list-items">
          {following.map((user) => (
            <li key={user.username}>{user.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FollowersList;
