import React from "react";

interface MessageContentProps {
  isOutgoingMessage: boolean;
  date: string;
  message: string;
}

const MessageContent = React.memo(
  ({ isOutgoingMessage = false, date, message }: MessageContentProps) => {
    return (
      <article className="border-b border-gray-c8 py-4 px-3 bg-pink-200">
        <div className="flex items-center justify-between mb-1">
          {isOutgoingMessage ? (
            <span className="text-highlight">보낸 메시지</span>
          ) : (
            <span className="text-[#12AA5F]">받은 메세지</span>
          )}
          <span className="text-sm text-gray-6c dark:text-gray-ee">
            {new Date(date).toLocaleString().slice(0, -3)}
          </span>
        </div>
        <p className="text-gray-6c dark:text-gray-ee whitespace-pre-wrap">
          {message}
        </p>
      </article>
    );
  }
);

export default MessageContent;
