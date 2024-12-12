import { axiosInstance } from "./axios";

interface CreatePostProps {
  title: string;
  channelId: string;
}

export const createPost = async (body: CreatePostProps) => {
  try {
    const { data } = await axiosInstance.post<Post>("/posts/create", body);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getOnePost = async (postId?: string) => {
  try {
    if (!postId) throw new Error("postId가 undefined입니다!");

    const { data } = await axiosInstance.get<Post>(`/posts/${postId}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};
