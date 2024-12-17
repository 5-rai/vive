import MessageContent from "../components/Message/MessageContent";
import MessageListItem from "../components/Message/MessageListItem";

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

export default function Message() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="flex flex-row">
        <article className="flex flex-col justify-between w-[721px] ">
          <div className="px-10">
            <div className="flex items-center mt-[38px] mb-[29px]">
              <img
                src={TEMP_USER.image || "/logo.png"}
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
          {[1, 2, 3, 4].map((item) => (
            <MessageListItem key={item} user={TEMP_USER} />
          ))}
        </aside>
      </section>
    </>
  );
}
