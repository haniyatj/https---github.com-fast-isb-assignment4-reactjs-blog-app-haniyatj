import {create} from 'zustand';

const useRatedStore = create((set) => ({
  ratedBlogId: null,
  setRatedBlogId: (blogId) => set({ ratedBlogId: blogId }),
}));

export default useRatedStore;