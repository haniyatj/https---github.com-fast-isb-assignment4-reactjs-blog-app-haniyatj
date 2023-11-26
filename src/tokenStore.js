import {create} from 'zustand';
import { jwtDecode } from "jwt-decode";

const useTokenStore = create((set) => ({
  token: null,
  setToken: (newToken) => set({ token: newToken }),
  decodeToken: () => {
   const { token } = useTokenStore.getState();
   // const { token } = set.getState();
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    }
    return null;
  },
}));


export default useTokenStore;
