import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";

const useGetMessagesWithUser = (userId: string) => {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getMessagesWithUser = async () => {
    if (!userId) return;

    try {
      if (!messages) setLoading(true);
      const { data } = await axiosInstance.get(`/messages`, {
        params: { userId },
      });
      setMessages(data);
    } catch (err) {
      if (err instanceof Error) setError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessagesWithUser();
  }, [userId]);

  return { messages, error, loading, refetch: getMessagesWithUser };
};

export default useGetMessagesWithUser;
