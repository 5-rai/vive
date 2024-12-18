import MessageContent from "./MessageContent";

interface MessageHistoryProps {
  userId: string;
  userInfo: User | undefined;
  messages: Message[] | null;
}

export default function MessageHistory({
  userId,
  userInfo,
  messages,
}: MessageHistoryProps) {
  return (
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
  );
}
