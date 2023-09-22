import pb from '@/api/pocketbase';
import { create } from 'zustand';

const initialLike = {
  likedMenuList: [],
  likedMenuKeyList: [],
  likedMenuKey: '',
};

const useLikeStore = create((set, get) => ({
  ...initialLike,

  getLikeList: async (user) => {
    const likeResponse = await pb
      .collection('users')
      .getList(1, 10, { filter: `username = "${user}"`, expand: 'cooks_keys' });

    console.log(likeResponse.items[0].expand.cooks_keys);

    set((state) => ({
      ...state,
      likedMenuList: likeResponse.items[0].expand.cooks_keys,
    }));

    return likeResponse.items[0].expand.cooks_keys;
  },

  setLikeList: (likedMenuList) => {
    set((state) => ({
      ...state,
      likedMenuList,
    }));
    return likedMenuList;
  },

  getLikeKeyList: async (user) => {
    const likeResponse = await pb
      .collection('users')
      .getList(1, 10, { filter: `username = "${user}"` });

    console.log(likeResponse.items[0].cooks_keys);

    set((state) => ({
      ...state,
      likedMenuKeyList: likeResponse.items[0].cooks_keys,
    }));

    return likeResponse.items[0].cooks_keys;
  },

  setLikeKeyList: (likedMenuKeyList) => {
    console.log(likedMenuKeyList);
    set((state) => ({
      ...state,
      likedMenuKeyList,
    }));
    return likedMenuKeyList;
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

  getLikedMenuKey: async (likedMenuList) => {
    const record = await pb.collection('cooks').getFullList({
      filter: `name = "${likedMenuList}"`,
    });

    set((state) => ({
      ...state,
      likedMenuKey: record[0].id,
    }));
  },

  addToPocketBase: async (user, likedMenu) => {
    const state = get();
    const updatedList = [...state.likedMenuKeyList, state.likedMenuKey];

    set((state) => ({
      ...state,
      likedMenuKeyList: updatedList,
    }));

    await pb.collection('users').update(user, {
      cooks_keys: updatedList,
    });

    return likedMenu;
  },

  removeFromPocketBase: async (user, likedMenu) => {
    const record = await pb.collection('cooks').getFullList({
      filter: `name = "${likedMenu}"`,
    });
    const likedMenuId = record[0].id;

    const state = get();
    const updatedList = state.likedMenuKeyList.filter(
      (key) => key !== likedMenuId
    );

    set((state) => ({
      ...state,
      likedMenuKeyList: updatedList,
    }));

    await pb.collection('users').update(user, {
      cooks_keys: updatedList,
    });

    return likedMenu;
  },
}));

export default useLikeStore;
