
import { create } from 'zustand';

const useSearchStore = create((set) => ({
  keywords: ' ',
  category: ' ',
  author: ' ',
  sortBy: ' ',
  sortOrder: 'asc', 
  updateSearchOptions: (options) => set(options),
}));

export default useSearchStore;
