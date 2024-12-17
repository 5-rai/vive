interface MessageListItemProps {
  user: User | null;
}

export default function MessageListItem({ user }: MessageListItemProps) {
  return (
    <>
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="p-3 hover:bg-secondary rounded-lg my-1 transition-colors group"
        >
          <div className="flex items-center justify-between ">
            <div className="flex items-center justify-center">
              <img
                src={user?.image || "/logo.png"}
                alt="프로필 이미지"
                className="w-[30px] h-[30px] mr-3 mb-1 rounded-full"
              />
              <p className="text-lg dark:group-hover:text-gray-22">닉네임{user?.fullName}</p>
            </div>
            <p className="text-sm text-gray-6c">24.12.25 12:45</p>
          </div>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-6c ">
            마지막 메세지 내용 마지막 메세지 내용 마지막 메세지 마지막 메세지
            내용 마지막 메세지 내용 마지막 메세
          </div>
        </div>
      ))}
    </>
  );
}
