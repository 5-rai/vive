import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axios";
import MessageListItem from "./MessageListItem";

const TEMP_USER: User = {
  role: "Regular",
  isOnline: false,
  posts: [],
  likes: [],
  comments: [],
  followers: [],
  following: [],
  notifications: [],
  messages: [],
  _id: "675c637f7812b71a3cef02b5",
  fullName: "하치와레",
  email: "abc2@gmail.com",
  createdAt: "2024-12-13T16:40:31.755Z",
  updatedAt: "2024-12-16T03:29:53.507Z",
  image:
    "https://res.cloudinary.com/learnprogrammers/image/upload/v1734108092/user/6559338b-237f-43f1-bf6d-764b9e133cf4.jpg",
  coverImage: "",
};

export default function MessageSidebar() {
  const [messageUser, setMessageUser] = useState<User | null>(null);
  const [conversationList, setConversationList] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);

  // 대화창 클릭하기
  const handleConversationClick = (conversationId: string) => {
    setSelectedConversationId(conversationId);
  };

  // 메세지를 주고받은 유저 정보 API 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get("/users/get-users");
        setMessageUser(response.data);
      } catch {
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
      } catch {
        setError("메시지 목록을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchMessageList();
  }, []);

  return (
    <aside className="h-full w-[419px] border-l px-7 pr-3 overflow-hidden flex flex-col">
      <h2 className="font-semibold text-2xl mt-10 mb-5">메시지함</h2>
      <section className="overflow-y-scroll custom-scrollbar mb-5">
        {conversationList && conversationList.length > 0 ? (
          conversationList.map((conversation) => (
            <MessageListItem
              key={conversation._id.join("-")}
              user={messageUser}
              conversation={conversation}
              isSelected={selectedConversationId === conversation._id.join("-")}
              onClick={() =>
                handleConversationClick(conversation._id.join("-"))
              }
            />
          ))
        ) : (
          <p>메시지가 없습니다.</p>
        )}
      </section>
    </aside>
  );
}
