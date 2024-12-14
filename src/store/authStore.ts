import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RequiredUser {
  _id: string;
  image: string | null;
  fullName: string;
}

interface AuthStore {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: RequiredUser | null;
  checkIsMyUserId: (id: string) => boolean;
  login: (accessToken: string, user: RequiredUser) => void;
  logout: () => void;
  updateUserImage: (image: string) => void;
  updateUserFullName: (fullName: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      accessToken: null,
      user: null,
      checkIsMyUserId: (id) => id === get().user?._id,
      login: (accessToken: string, user: RequiredUser) =>
        set({ isLoggedIn: true, accessToken, user }),
      logout: () => set({ isLoggedIn: false, accessToken: null, user: null }),
      updateUserImage: (image: string) =>
        set((state) => ({
          user: state.user ? { ...state.user, image } : null,
        })),
      updateUserFullName: (fullName: string) =>
        set((state) => ({
          user: state.user ? { ...state.user, fullName } : null,
        })),
    }),
    {
      name: "auth", // localStorage에 저장될 key 이름
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        accessToken: state.accessToken,
        user: state.user,
      }), // 필요한 상태만 저장
    }
  )
);
