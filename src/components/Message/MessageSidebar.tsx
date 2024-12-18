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
  return (
    <aside className="h-full w-[419px] border-l px-7 pr-3 overflow-hidden flex flex-col">
      <h2 className="font-semibold text-2xl mt-10 mb-5">메시시지함</h2>
      <section className="overflow-y-scroll custom-scrollbar mb-5">
        {[1, 2, 3, 4].map((item) => (
          <MessageListItem key={item} user={TEMP_USER} />
        ))}
      </section>
    </aside>
  );
}
