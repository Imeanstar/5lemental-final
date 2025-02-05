import { create } from 'zustand';

const initialSearchLogState = {
  searchList: [],
  isNavigated: true,
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

  setIsNavigated: (status) => {
    set((state) => ({
      ...state,
      isNavigated: status,
    }));
    return status;
  },
}));

export default useSearchLogStore;
