import { create } from "zustand";

interface PostStore {
  post?: Post;
  postId: string;
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
  setPostId: (postId: string) => void;
  setPost: (post: Post) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  post: undefined,
  postId: "",
  comments: [],
  setPostId: (postId) => set({ postId }),
  addComment: (comment) =>
    set((prev) => ({ comments: [...prev.comments, comment] })),
  setComments: (comments) => set({ comments }),
  setPost: (post) => set({ post }),
}));
