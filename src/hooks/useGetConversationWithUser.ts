import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";

const useGetConversationWithUser = (userId: string) => {
  const [conversation, setConversation] = useState<Message[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getConversationWithUser = async () => {
    if (!userId) return;

    try {
      if (!conversation) setLoading(true);
      const { data } = await axiosInstance.get(`/messages`, {
        params: { userId },
      });
      setConversation(data);
    } catch (err) {
      if (err instanceof Error) setError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConversationWithUser();
  }, [userId]);

  return { conversation, error, loading, refetch: getConversationWithUser };
};

export default useGetConversationWithUser;
