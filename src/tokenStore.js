import {create} from 'zustand';
 // @ts-ignore  
 import * as jwt_decode from "jwt-decode";
const useTokenStore = create((set) => ({
  token: null,
  setToken: (newToken) => set({ token: newToken }),
  decodeToken: () => {
    const { token } = useTokenStore.getState();
    if (token) {
      const decodedToken = jwt_decode(token);
      return decodedToken;
    }
    return null;
  },
}));

export default useTokenStore;
