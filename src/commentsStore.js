import {create} from 'zustand';

const useCommentsStore = create((set) => ({
  commentedBlogId: null,
  setCommentedBlogId: (blogId) => set({ commentedBlogId: blogId }),
}));

export default useCommentsStore;
