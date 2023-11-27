import {create} from 'zustand';

const useBlogStore = create((set) => ({
  blogPosts: [],
  selectedBlogPost: null,

  setBlogPosts: (posts) => set({ blogPosts: posts }),
  setSelectedBlogPost: (post) => set({ selectedBlogPost: post }),
}));

export default useBlogStore;
