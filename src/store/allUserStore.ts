import { create } from "zustand";
import { getAllUsers } from "../api/user";

interface AllUserStore {
  users: User[];
  fetchUsers: () => Promise<void>;
  getUser: (id: string) => User | undefined;
}

export const useAllUserStore = create<AllUserStore>((set, get) => ({
  users: [],
  fetchUsers: async () => {
    try {
      const data = await getAllUsers();
      data?.sort((a) => (a.isOnline ? -1 : 1));
      set({ users: data });
    } catch (err) {
      console.error(err);
    }
  },
  getUser: (id: string) => get().users.find((user) => user._id === id),
}));
