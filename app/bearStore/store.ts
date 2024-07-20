import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        login: (userData) =>
          set({
            user: userData,
          }),
        logout: () =>
          set({
            user: null,
          }),
      }),
      {
        name: 'user-storage',
        getStorage: () => localStorage,
      }
    )
  )
);

export default useUserStore;
