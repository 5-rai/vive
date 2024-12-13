import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { axiosInstance } from "../api/axios";

interface UserStore {
  isLoggedIn: boolean;
  accessToken: string | null;
  profileImage: string | null;
  fullName: string | null;
  login: (accessToken: string) => void;
  logout: () => void;
  updateProfileImage: (imageUrl: string) => void;
  updateFullName: (name: string) => void;
  fetchUserProfile: () => Promise<void>;
}

export const userStore = create<UserStore>((set, get) => ({
  isLoggedIn: false,
  accessToken: null,
  profileImage: null,
  fullName: null,
  login: (accessToken: string) => set({ isLoggedIn: true, accessToken }),
  logout: () =>
    set({
      isLoggedIn: false,
      accessToken: null,
      profileImage: null,
      fullName: null,
    }),
  updateProfileImage: (imageUrl: string) => set({ profileImage: imageUrl }),
  updateFullName: (name: string) => set({ fullName: name }),

  fetchUserProfile: async () => {
    const { isLoggedIn } = useAuthStore.getState();

    if (!isLoggedIn) {
      console.warn("로그인되어 있지 않거나 토큰이 없습니다");
      return;
    }

    try {
      const response = await axiosInstance.get("/auth-user");

      const data = response.data;

      // 사용자 프로필 정보 설정
      if (data.image) {
        set({ profileImage: data.image });
      }
      if (data.fullName) {
        set({ fullName: data.fullName });
      }
    } catch (error) {
      console.error("사용자 프로필을 가져오는 중 오류 발생:", error);
    }
  },
}));
