import {create} from 'zustand';

const useAdminStore = create((set) => ({
  users: [],
  blogPosts: [],
  setUsers: (users) => set({ users }),
  setBlogPosts: (blogPosts) => set({ blogPosts }),
}));

export default useAdminStore;
