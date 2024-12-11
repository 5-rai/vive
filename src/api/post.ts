import { axiosInstance } from "./axios";

interface createPostProps {
  title: string;
  channelId: string;
}

export const createPost = async (body: createPostProps) => {
  try {
    const { data } = await axiosInstance.post<Post>("/posts/create", body);
    return data;
  } catch (err) {
    console.error(err);
  }
};
