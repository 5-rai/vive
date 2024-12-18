import { useSearchParams } from "react-router";
import MessageContent from "../components/Message/MessageContent";
import MessageSidebar from "../components/Message/MessageSidebar";
import { useEffect, useRef, useState } from "react";
import useGetMessagesWithUser from "../hooks/useGetMessagesWithUser";
import Loading from "../components/common/Loading";
import { useAllUserStore } from "../store/allUserStore";
import { postMessage } from "../api/message";

export default function Message() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user") ?? "";
  const [newMessage, setNewMessage] = useState("");
  const [userInfo, setUserInfo] = useState<User | undefined>();
  const { messages, loading, error, refetch } = useGetMessagesWithUser(userId);
  const getUsers = useAllUserStore((state) => state.getUser);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newMessage);
    const data = await postMessage(newMessage, userId);
    if (data) {
      setNewMessage("");
      refetch();
      // TODO: 메시지 확인 API 쏘기
    }
  };

  const adjustHeight = () => {
    // 높이가 5줄까지만 늘어나도록 설정
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto"; // 기존 높이 초기화
    textareaRef.current.style.height = `${Math.min(
      textareaRef.current.scrollHeight,
      24 * 5
    )}px`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    adjustHeight();
  };

  useEffect(() => {
    if (userId) setUserInfo(getUsers(userId));
    // TODO: 메시지 확인 API 쏘기
    adjustHeight();
  }, [userId]);

  if (!userId)
    return (
      <section className="flex w-full">
        <article className="grow flex">
          <p className="w-full text-lg text-center mt-36">
            메세지 목록을 선택해주세요.
          </p>
        </article>
        <MessageSidebar />
      </section>
    );

  if (loading) {
    return (
      <section className="flex w-full">
        <article className="grow flex">
          <Loading />
        </article>
        <MessageSidebar />
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex w-full">
        <article className="grow flex">
          <p className="w-full text-lg text-center mt-36">
            사용자 정보를 불러오는 데 실패했습니다.
          </p>
        </article>
        <MessageSidebar />
      </section>
    );
  }

  return (
    <div className="flex w-full screen-100vh">
      <section className="grow h-full flex flex-col justify-between">
        <div className="pl-10 pr-6 grow flex flex-col overflow-hidden mt-10 mb-5">
          <section className="flex items-center mb-5 mr-4">
            <img
              src={userInfo?.image || "/logo.png"}
              alt="프로필 이미지"
              className="w-8 h-8 mr-3 rounded-full profile"
            />
            <p className="text-xl dark:text-white font-semibold">
              {userInfo?.fullName}
            </p>
          </section>
          <section className="grow overflow-y-scroll custom-scrollbar">
            {messages?.map((message) => (
              <MessageContent
                key={message._id}
                isOutgoingMessage={message.receiver._id === userId}
                message={message.message}
                date={message.createdAt}
              />
            ))}
          </section>
        </div>
        <section className="border-t border-gray-c8 px-10 pb-8">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="block w-full mt-5 p-4 pr-1 border border-gray-c8 rounded-[15px] dark:border-gray-c8/50 dark:bg-white/20">
              <textarea
                ref={textareaRef}
                rows={1}
                value={newMessage}
                placeholder="메세지를 입력해주세요."
                className="block w-full resize-none overflow-y-scroll custom-scrollbar bg-transparent text-gray-22"
                onChange={handleChange}
              />
            </div>
            <button
              className="self-end rounded-xl mt-4 py-2 px-5 text-gray-22 primary-btn"
              type="submit"
              disabled={newMessage === ""}
            >
              보내기
            </button>
          </form>
        </section>
      </section>
      <MessageSidebar />
    </div>
  );
}
