import { useSearchParams } from "react-router";
import MessageSidebar from "../components/Message/MessageSidebar";
import { useEffect } from "react";
import useGetMessagesWithUser from "../hooks/useGetMessagesWithUser";
import Loading from "../components/common/Loading";
import MessageHistory from "../components/Message/MessageHistory";
import MessageForm from "../components/Message/MessageForm";
import { checkMessageSeen } from "../api/message";

export default function Message() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user") ?? "";
  const { messages, loading, error, refetch } = useGetMessagesWithUser(userId);

  useEffect(() => {
    if (userId) checkMessageSeen(userId);
  }, [messages]);

  if (!userId)
    return (
      <div className="flex w-full screen-100vh">
        <section className="grow h-full flex flex-col">
          {!userId && (
            <p className="w-full text-lg text-center mt-36">
              메시시지 목록을 선택해주세요.
            </p>
          )}
        </section>
        <MessageSidebar />
      </div>
    );

  if (loading || error) {
    return (
      <section className="w-[934px] mx-auto flex items-center justify-center">
        {loading && <Loading />}
        {error && <p className="text-lg font-medium">{error}</p>}
      </section>
    );
  }

  return (
    <div className="flex w-full screen-100vh">
      <section className="grow h-full flex flex-col">
        {loading ? (
          <Loading />
        ) : error ? (
          <p className="w-full text-lg text-center mt-36">
            사용자 정보를 불러오는 데 실패했습니다.
          </p>
        ) : (
          <>
            <MessageHistory userId={userId} messages={messages} />
            <MessageForm userId={userId} refetch={refetch} />
          </>
        )}
      </section>
      <MessageSidebar />
    </div>
  );
}
