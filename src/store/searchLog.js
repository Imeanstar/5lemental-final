import { create } from 'zustand';

const initialSearchLogState = {
  searchList: [],
};

const useSearchLogStore = create((set) => ({
  ...initialSearchLogState,

  setSearchList: (searchItem) => {
    set((state) => ({
      ...state,
      searchList: searchItem,
    }));
    return searchItem;
  },
}));

export default useSearchLogStore;
