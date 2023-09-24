import pb from '@/api/pocketbase';
import { create } from 'zustand';

const USER_COLLECTION = 'users';

const initialAuthState = {
  id: '',
  isValid: false,
  user: null,
  token: '',
};

const authStore = (set) => ({
  ...initialAuthState,

  /* Pb SDK를 사용한 회원가입 */
  signUp: async (newUser) => {
    return await pb.collection(USER_COLLECTION).create(newUser);
  },

  /* Pb SDK를 사용한 로그인 */
  signIn: async (id, password) => {
    const authData = await pb
      .collection(USER_COLLECTION)
      .authWithPassword(id, password);

    const { isValid, model, token } = pb.authStore;

    set((state) => ({
      ...state,
      id,
      isValid,
      user: model.id,
      token,
    }));

    return authData;
  },

  /* Pb SDK를 사용한 로그아웃 */
  signOut: async () => {
    const response = await pb.authStore.clear();

    set((state) => ({
      ...state,
      ...initialAuthState,
    }));

    return response;
  },
});

const useAuthStore = create(authStore);

export default useAuthStore;