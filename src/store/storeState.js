import { create } from 'zustand';

const useStore = create((set) => {
  return {
    cart: [],

		// cart 업데이트 함수
    setCart: (newCart) =>
      set(() => ({
        cart: newCart,
      })),

		// cart 개별 항목 stat 값 업데이트 함수
    changeStateOfCartItem: (itemId, value) =>
      set((state) => ({
        cart: state.cart.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              stat: value,
            };
          } else {
            return item;
          }
        }),
      })),
  };
});

export default useStore;