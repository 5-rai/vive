import { axiosInstance } from "./axios";

export const postMessage = async (message: string, receiver: string) => {
  try {
    const { data } = await axiosInstance.post<Message>("/messages/create", {
      message,
      receiver,
    });
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
