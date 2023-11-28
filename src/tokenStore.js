import {create} from 'zustand';
import { jwtDecode } from "jwt-decode";

const useTokenStore = create((set) => ({
  token: null,
  newPostCreated: false,
  setToken: (newToken) => set({ token: newToken }),
  setNewPostCreated: (status) => set({ newPostCreated: status }),

  decodeToken: () => {
   const { token } = useTokenStore.getState();
   
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    }
    return null;
  },
}));


export default useTokenStore;
