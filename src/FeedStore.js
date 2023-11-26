import { create } from 'zustand';

const useFeedStore = create((set) => ({
    feed: [],
    loadFeed: async (username,token) => {
      try {
  
        console.log('Fetching feed for username:', username);
      console.log('Token used:', token);
        const response = await fetch(`http://localhost:3000/users/feed/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch feed');
        }
  
        const data = await response.json();
        console.log(data.feed)
        set({ feed: data.feed });
      } catch (error) {
        console.error('Error fetching feed:', error.message);
      }
    },
  }));

  export default useFeedStore;