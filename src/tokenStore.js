import {create} from 'zustand';
import { jwtDecode } from "jwt-decode";

const useTokenStore = create((set) => ({
  token: null,
  setToken: (newToken) => set({ token: newToken }),
  decodeToken: () => {
 //   const { token } = useTokenStore.getState();
    const { token } = set.getState();
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    }
    return null;
  },
}));
const useZustandStore = create((set) => ({
  feed: [],
  loadFeed: async (username) => {
    try {
      const { token } = useTokenStore.getState();

      const response = await fetch(`/api/users/feed/${username}`, {
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
      set({ feed: data.feed });
    } catch (error) {
      console.error('Error fetching feed:', error.message);
    }
  },
}));

export default useTokenStore;
