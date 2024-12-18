import { useSearchParams } from "react-router";
import MessageSidebar from "../components/Message/MessageSidebar";
import { useEffect, useState } from "react";
import useGetMessagesWithUser from "../hooks/useGetMessagesWithUser";
import Loading from "../components/common/Loading";
import { useAllUserStore } from "../store/allUserStore";
import MessageHistory from "../components/Message/MessageHistory";
import MessageForm from "../components/Message/MessageForm";

export default function Message() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user") ?? "";
  const [userInfo, setUserInfo] = useState<User | undefined>();
  const { messages, loading, error, refetch } = useGetMessagesWithUser(userId);
  const getUsers = useAllUserStore((state) => state.getUser);

  useEffect(() => {
    if (userId) setUserInfo(getUsers(userId));
    // TODO: 메시지 확인 API 쏘기
  }, [userId]);

  if (!userId)
    return (
      <div className="flex w-full screen-100vh">
        <section className="grow h-full flex flex-col">
          {!userId && (
            <p className="w-full text-lg text-center mt-36">
              메세지 목록을 선택해주세요.
            </p>
          )}
        </section>
        <MessageSidebar />
      </div>
    );

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
            <MessageHistory
              userId={userId}
              userInfo={userInfo}
              messages={messages}
            />
            <MessageForm userId={userId} refetch={refetch} />
          </>
        )}
      </section>
      <MessageSidebar />
    </div>
  );
}
