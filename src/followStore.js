import {create} from 'zustand';

const useFollowStore = create((set) => ({
    following: [],
    followers: [],
    loadFollowData: async (username,token) => {
      try {
        console.log('Fetching following data for username:', username);
        const followingResponse = await fetch(`http://localhost:3000/users/following/${username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
        const followingData = await followingResponse.json();
        set({ following: followingData.following });
  
        console.log('Fetching followers data for username:', username);
        const followersResponse = await fetch(`http://localhost:3000/users/followers/${username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        const followersData = await followersResponse.json();
        set({ followers: followersData.followers });

      } catch (error) {
        console.error('Error fetching follow data:', error.message);
      }
    },
  }));
export default useFollowStore;
