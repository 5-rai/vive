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
      set({ users: data });
    } catch (err) {
      console.error(err);
    }
  },
  getUser: (id: string) => get().users.find((user) => user._id === id),
}));
