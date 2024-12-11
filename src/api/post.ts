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
