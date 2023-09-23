import pb from '@/api/pocketbase';
import { create } from 'zustand';

const initialMenuState = {
  category: '한식',
  categoryMenuList: [],
  selectedMenu: '',
};

const useCategoryStore = create((set) => ({
  ...initialMenuState,

  setCategory: (category) => {
    set((state) => ({
      ...state,
      category,
    }));
    return category;
  },

  setSelectedMenu: (selectedMenu) => {
    set((state) => ({
      ...state,
      selectedMenu,
    }));
    return selectedMenu;
  },

  getMenu: async (category) => {
    const nameResponse = await pb
      .collection('cooks')
      .getList(1, 10, { filter: `category = "${category}"` });

    set((state) => ({
      ...state,
      categoryMenuList: nameResponse.items,
    }));

    return nameResponse.items;
  },

  getDescription: async (menuName) => {
    const recipeResponse = await pb
      .collection('cooks')
      .getFullList({ filter: `name = "${menuName}"` });

    const recipe = recipeResponse[0].description;
    return recipe;
  },

  getIngredientsKeys: async (selectedMenu) => {
    const ingredientsResponse = await pb
      .collection('cooks')
      .getFullList({ filter: `name = "${selectedMenu}"` });
    const ingredientsKeys = ingredientsResponse[0].ingredients_keys;

    set((state) => ({
      ...state,
      ingredientsKeys: ingredientsKeys,
    }));

    return ingredientsKeys;
  },

  getIngredientsName: async (ingredientsKey) => {
    const ingredientsResponse = await pb
      .collection('ingredients')
      .getFullList({ filter: `id = "${ingredientsKey}"` });

    console.log(ingredientsResponse[0].name);

    return ingredientsResponse[0].name;
  },

  getIngredientsImage: async (ingredientsKey) => {
    const ingredientsResponse = await pb
      .collection('ingredients')
      .getFullList({ filter: `id = "${ingredientsKey}"` });

    const imageURL = pb.files.getUrl(
      ingredientsResponse[0],
      ingredientsResponse[0].photo,
      {
        thumb: '60x60',
      }
    );

    return imageURL;
  },
}));

export default useCategoryStore;
