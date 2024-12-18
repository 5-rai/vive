import { useEffect, useState } from "react";
import MessageContent from "../components/Message/MessageContent";
import MessageListItem from "../components/Message/MessageListItem";
import { axiosInstance } from "../api/axios";
import Loading from "../components/common/Loading";

export default function Message() {
  const [messageUser, setMessageUser] = useState<User | null>(null);
  const [conversationList, setConversationList] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // 메세지를 주고받은 유저 정보 API 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get("/users/get-users");
        setMessageUser(response.data);
      } catch (err) {
        setError("사용자 정보를 불러오는데 실패했습니다.");
      }
    };
    fetchUserInfo();
  }, []);

  // 주고 받은 메세지 내역 API 불러오기
  useEffect(() => {
    const fetchMessageList = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<Conversation[]>(
          "/messages/conversations"
        );
        setConversationList(response.data);
        console.log(response);
      } catch (err) {
        setError("메시지 목록을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchMessageList();
  }, []);

  if (loading || error) {
    return (
      <section className="w-[934px] mx-auto flex items-center justify-center">
        {loading && <Loading />}
        {error && <p className="text-lg font-medium">{error}</p>}
      </section>
    );
  }

  // 대화창 클릭하기
  const handleConversationClick = (conversationId: string) => {
    setSelectedConversationId(conversationId);
  };

  return (
    <>
      <section className="flex flex-row">
        <article className="flex flex-col justify-between w-[721px] ">
          <div className="px-10">
            <div className="flex items-center mt-[38px] mb-[29px]">
              <img
                src={messageUser?.image || "/logo.png"}
                alt="프로필 이미지"
                className="w-8 h-8 mr-3 rounded-full profile"
              />
              <p className="text-xl dark:text-white font-semibold">
                닉네임{/* {user?.fullName} */}
              </p>
            </div>
            <MessageContent
              isOutgoingMessage={false}
              message="안녕하세요~~~~ 반갑습니다아~~~~ ^_^"
            />
          </div>
          <div className="border-t border-gray-c8 px-10 pb-8">
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <textarea
                className="w-full mt-5 p-3 border border-gray-c8 rounded-[15px] dark:border-gray-c8/50 resize-none"
                placeholder="메세지를 입력해주세요."
              />
              <button
                className="self-end w-20 h-10 rounded-[15px] mt-4 py-[7px] px-[19px] bg-primary text-gray-22"
                type="submit"
              >
                보내기
              </button>
            </form>
          </div>
        </article>
        <aside className="w-[419px] border-l px-[29px]">
          <h2 className="font-semibold text-2xl mt-10 mb-5">메세지함</h2>
          {conversationList && conversationList.length > 0 ? (
            conversationList.map((conversation) => (
              <MessageListItem
                key={conversation._id.join("-")}
                user={messageUser}
                conversation={conversation}
                isSelected={
                  selectedConversationId === conversation._id.join("-")
                }
                onClick={() =>
                  handleConversationClick(conversation._id.join("-"))
                }
              />
            ))
          ) : (
            <p>메시지가 없습니다.</p>
          )}
        </aside>
      </section>
    </>
  );
}
