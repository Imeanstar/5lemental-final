import pb from '@/api/pocketbase';
import { create } from 'zustand';

const initialLike = {
  likedMenuList: [],
};

const useLikeStore = create((set) => ({
  ...initialLike,

  getLikeList: async (user) => {
    const likeResponse = await pb
      .collection('users')
      .getList(1, 10, { filter: `username = "${user}"`, expand: 'cooks_keys' });

    set((state) => ({
      ...state,
      likedMenuList: likeResponse.items[0].expand.cooks_keys,
    }));

    return likeResponse.items[0].expand.cooks_keys;
  },

  setLikeList: (likedMenuList) => {
    console.log(likedMenuList);
    set((state) => ({
      ...state,
      likedMenuList,
    }));
    return likedMenuList;
  },

  addLikedMenu: async (likedMenu) => {
    // const record = await pb.collection('cooks').getFullList({
    //   filter: `name = "${likedMenu}"`,
    // });
    // console.log(record[0].id);
    set((state) => ({
      ...state,
      likedMenuList: [...state.likedMenuList, likedMenu],
    }));

    return likedMenu;
  },

  removeLikedMenu: (likedMenu) => {
    set((state) => ({
      ...state,
      likedMenuList: state.likedMenuList.filter((menu) => menu !== likedMenu),
    }));
    return likedMenu;
  },
}));

export default useLikeStore;
