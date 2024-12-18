import { useSearchParams } from "react-router";
import MessageContent from "../components/Message/MessageContent";
import MessageSidebar from "../components/Message/MessageSidebar";
import { useEffect, useState } from "react";
import useGetMessagesWithUser from "../hooks/useGetMessagesWithUser";
import Loading from "../components/common/Loading";
import { useAllUserStore } from "../store/allUserStore";

export default function Message() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user") ?? "";
  const [newMessage, setNeMessage] = useState("");
  const [userInfo, setUserInfo] = useState<User | undefined>();
  const { messages, loading, error } = useGetMessagesWithUser(userId);
  const getUsers = useAllUserStore((state) => state.getUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newMessage);
    // TODO: 메시지 전송 API 쏘기
    //const data = await postMessage(newMessage, userId);
    // 성공 시, setNewMessage("")
  };

  useEffect(() => {
    if (userId) setUserInfo(getUsers(userId));
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
    <div className="flex w-full bg-red-200">
      <section className="grow flex flex-col justify-between bg-blue-200">
        <div className="px-10 bg-orange-200">
          <section className="flex items-center mt-10 mb-7 bg-purple-200">
            <img
              src={userInfo?.image || "/logo.png"}
              alt="프로필 이미지"
              className="w-8 h-8 mr-3 rounded-full profile"
            />
            <p className="text-xl dark:text-white font-semibold">
              {userInfo?.fullName}
            </p>
          </section>
          <section>
            {messages?.map((message) => (
              <MessageContent
                key={message._id}
                isOutgoingMessage={message.sender._id === userId}
                message={message.message}
                date={message.createdAt}
              />
            ))}
          </section>
        </div>
        <section className="border-t border-gray-c8 px-10 pb-8 bg-yellow-200">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <textarea
              value={newMessage}
              className="w-full mt-5 p-3 border border-gray-c8 rounded-[15px] dark:border-gray-c8/50 resize-none"
              placeholder="메세지를 입력해주세요."
              onChange={(e) => setNeMessage(e.target.value)}
            />
            <button
              className="self-end w-20 h-10 rounded-[15px] mt-4 py-[7px] px-[19px] bg-primary text-gray-22"
              type="submit"
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
