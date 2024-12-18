import { create } from "zustand";

interface ToastStore {
  isToastVisible: boolean; // 토스트 상태
  toastMessage: string; // 토스트 메시지
  showToast: (message: string) => void; // 토스트 표시 액션
  hideToast: () => void; // 토스트 숨김 액션
}

export const useToastStore = create<ToastStore>((set) => ({
  isToastVisible: false,
  toastMessage: "",
  showToast: (message) => set({ isToastVisible: true, toastMessage: message }), // 토스트 표시
  hideToast: () => set({ isToastVisible: false, toastMessage: "" }), // 토스트 숨김
}));
