import { AxiosError } from "axios";
import { axiosInstance } from "./axios";

interface CreateCommentProps {
  comment: string;
  postId?: string;
}

export const createComment = async (body: CreateCommentProps) => {
  try {
    if (!body.postId) throw new Error("/postId가 undefined입니다!");

    const { data } = await axiosInstance.post<Comment & AxiosError>(
      "/comments/create",
      body
    );
    return data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) return err.response;
    }
  }
};
