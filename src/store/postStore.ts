import { create } from "zustand";

interface PostStore {
  postId: string;
  comments: Comment[];
  addComment: (comment: Comment) => void;
  setPostId: (postId: string) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  postId: "",
  comments: [],
  addComment: (comment: Comment) =>
    set((prev) => ({ comments: [...prev.comments, comment] })),
  setPostId: (postId: string) => set({ postId }),
}));
