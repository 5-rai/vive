import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";

const useGetMessagesWithUser = (userId: string) => {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const getMessagesWithUser = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/messages`, {
          params: { userId },
        });
        setMessages(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getMessagesWithUser();
  }, [userId]);

  return { messages, error, loading };
};

export default useGetMessagesWithUser;
