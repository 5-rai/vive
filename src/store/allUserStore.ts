import { create } from "zustand";

// TODO: 유저 업데이트 로직 추가

interface AllUserStore {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
}

export const useAllUserStore = create<AllUserStore>((set) => ({
  users: [],
  setUsers: (users: User[]) => set({ users }),
  addUser: (user: User) =>
    set((state: AllUserStore) => ({ users: [...state.users, user] })),
}));
