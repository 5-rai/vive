import Bookmark from "../components/Write/Bookmark";
import Temp from "../assets/youtube-temp.avif";
import Dropdown from "../components/Write/Dropdown";

const DUMMY_DATA = {
  title: "WONDER STAGE - G-DRAGON",
  description: "설명 어쩌고 저쩌고",
  url: "https://www.youtube.com/watch?v=5BA7MoSSHTA",
  thumbnail: Temp,
};

export default function Write() {
  const isBookmark = true; // 임시
  const isDisabled = true; // 임시

  return (
    <section className="w-full px-16 py-7">
      <form className="flex flex-col gap-4">
        <Dropdown />
        <input
          className="border-b p-3 focus:border-primary text-2xl border-gray-c8 dark:border-gray-c8/50"
          placeholder="제목을 입력하세요"
        />
        <div className="border focus-within:border-primary rounded-lg border-gray-c8 dark:border-gray-c8/50 overflow-hidden p-6 bg-white dark:bg-white/10">
          <textarea
            className="w-full h-[280px] resize-none bg-transparent custom-scrollbar"
            placeholder="내용을 입력해주세요"
          />
        </div>
        <input
          type="url"
          className="border focus:border-primary rounded-lg py-3 px-5 border-gray-c8 dark:border-gray-c8/50"
          placeholder="유튜브 url를 입력하세요"
        />
        {isBookmark && (
          <Bookmark
            title={DUMMY_DATA.title}
            description={DUMMY_DATA.description}
            url={DUMMY_DATA.url}
            thumbnail={DUMMY_DATA.thumbnail}
          />
        )}
        <button
          disabled={isDisabled}
          className="primary-btn self-end h-[50px] w-[157px] rounded-lg flex justify-center items-center"
        >
          포스팅 올리기
        </button>
      </form>
    </section>
  );
}
