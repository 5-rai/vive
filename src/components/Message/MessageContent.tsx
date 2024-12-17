interface MessageContentProps {
  isOutgoingMessage: boolean;
  message: string;
}

export default function MessageContent({
  isOutgoingMessage = false,
  message,
}: MessageContentProps) {
  return (
    <>
      <div className="border-b border-gray-c8 py-4 px-3">
        <div className="flex items-center justify-between mb-1">
          {isOutgoingMessage ? (
            <span className="text-highlight">보낸 메시지</span>
          ) : (
            <span className="text-[#12AA5F]">받은 메세지</span>
          )}
          <span className="text-sm text-gray-6c dark:text-gray-ee">24.12.25 12:45</span>
        </div>
        <p className="text-gray-6c dark:text-gray-ee whitespace-pre-wrap">{message}</p>
      </div>
    </>
  );
}
