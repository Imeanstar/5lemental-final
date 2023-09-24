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

  initialize: () => {
    // 화면 새로고침 시 로그인 상태 초기화
    const token = localStorage.getItem('token');
    if (token) {
      pb.setToken(token); // Pocketbase에 토큰 설정
      set({ isLoggedIn: true, token });
    }
  },

  /* Pb SDK를 사용한 회원가입 */
  signUp: async (newUser) => {
    const authData = await pb.collection(USER_COLLECTION).create(newUser);
    const { token } = pb.authStore;
    
    // 토큰을 로컬 스토리지에 저장
    localStorage.setItem('token', token);

    set((state) => ({
      ...state,
      isLoggedIn: true,
      token,
    }));

    return authData;
  },

  /* Pb SDK를 사용한 로그인 */
  signIn: async (id, password) => {
    const authData = await pb
      .collection(USER_COLLECTION)
      .authWithPassword(id, password);
    const { token } = pb.authStore;

    // 토큰을 로컬 스토리지에 저장
    localStorage.setItem('token', token);

    set((state) => ({
      ...state,
      id,
      isLoggedIn: true,
      token,
    }));

    return authData;
  },

  /* Pb SDK를 사용한 로그아웃 */
  signOut: async () => {
    const response = await pb.authStore.clear();

    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('token');

    set((state) => ({
      ...state,
      ...initialAuthState,
    }));

    return response;
  },
});

const useAuthStore = create(authStore);

export default useAuthStore;
