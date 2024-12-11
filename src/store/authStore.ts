import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      login: (accessToken: string) => set({ isLoggedIn: true, accessToken }),
      logout: () => set({ isLoggedIn: false, accessToken: null }),
    }),
    {
      name: "auth", // localStorage에 저장될 key 이름
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        accessToken: state.accessToken,
      }), // 필요한 상태만 저장
    }
  )
);
