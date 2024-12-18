interface MessageListItemProps {
  user: User | null;
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

export default function MessageListItem({
  user,
  conversation,
  isSelected,
  onClick,
}: MessageListItemProps) {
  const otherUser =
    conversation.sender._id === user?._id
      ? conversation.receiver
      : conversation.sender;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatMessageDateTime = formatDate(conversation.createdAt);
  return (
    <>
      <div
        className={`p-3 rounded-lg my-1 transition-colors group cursor-pointer ${
          isSelected ? "bg-primary" : "hover:bg-secondary"
        }`}
        onClick={onClick}
      >
        <div className="flex items-center justify-between ">
          <div className="flex items-center justify-center">
            <img
              src={otherUser.image || "/logo.png"}
              alt="프로필 이미지"
              className={`w-[30px] h-[30px] mr-3 mb-1 rounded-full profile transition-border ${
                isSelected
                  ? "border-gray-c8 bg-white/80"
                  : "group-hover:border-gray-c8 group-hover:bg-white/80"
              }`}
            />
            <p
              className={`text-lg font-medium ${
                isSelected
                  ? " dark:text-gray-22"
                  : "dark:text-white dark:group-hover:text-gray-22"
              }`}
            >
              {otherUser.fullName}
            </p>
          </div>
          <p
            className={`text-sm ${
              isSelected
                ? "text-gray-6c dark:text-gray-c6"
                : "text-gray-6c dark:text-gray-c8 dark:group-hover:text-gray-c6"
            }`}
          >
            {formatMessageDateTime}
          </p>
        </div>
        <div
          className={`line-clamp-1 ${
            isSelected
              ? "text-gray-6c dark:text-gray-c6"
              : "text-gray-6c dark:text-gray-c8 dark:group-hover:text-gray-c6"
          }`}
        >
          {conversation.message}
        </div>
      </div>
    </>
  );
}
