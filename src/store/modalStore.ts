import { create } from "zustand";
import { ReactNode } from "react";

interface ModalStore {
  isOpen: boolean;
  confirmText: string;
  cancelText: string;
  children?: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  setModal: (props: Partial<ModalStore>) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  confirmText: "",
  cancelText: "",
  children: undefined,
  onClose: () => set({ isOpen: false }), // 모달 닫기
  onConfirm: () => set({ isOpen: false }), // 모달 닫기 후 작업 수행
  setModal: (props) => set({ ...props }), // 상태 동적으로 설정
}));
