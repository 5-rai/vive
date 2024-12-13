import { create } from "zustand";

// TODO: 유저 업데이트 로직 추가

interface AllUserStore {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  findUserById(userId: string, state: AllUserStore): User | undefined;
}

export const useAllUserStore = create<AllUserStore>((set) => ({
  users: [],
  setUsers: (users: User[]) => set({ users }),
  addUser: (user: User) =>
    set((state: AllUserStore) => ({ users: [...state.users, user] })),
  findUserById: (userId: string, state: AllUserStore) => {
    const user = state.users.find((user) => user._id === userId);
    return user;
  },
}));
