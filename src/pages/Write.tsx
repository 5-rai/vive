import Bookmark from "../components/Write/Bookmark";
import Dropdown from "../components/Write/Dropdown";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { getOneYoutubeVideoInfo } from "../api/youtube";
import { createPost } from "../api/post";
import { useNavigate } from "react-router";

const youtubeLinkRegex = /^https:\/\/www\.youtube\.com.*\bv\b/;

export default function Write() {
  const navigate = useNavigate();
  const [videoInfo, setVideoInfo] = useState<Partial<YoutubeVideoType>>();

  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<Channel>();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState({
    value: "",
    validUrl: "",
    isWarning: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const post = await createPost({
      title: JSON.stringify({
        title,
        contents,
        youtubeUrl: youtubeUrl.validUrl,
      }),
      channelId: selectedChannel!._id,
    });
    navigate(`/channels/${selectedChannel!.name}/${post!._id}`);
  };

  const createBookmark = async (url: string) => {
    if (!youtubeLinkRegex.test(url)) {
      setYoutubeUrl({ ...youtubeUrl, value: url, isWarning: true });
      setVideoInfo(undefined);
      return;
    }

    const parsedUrl = new URL(url);
    const videoId = new URLSearchParams(parsedUrl.search).get("v");
    const videoInfo = await getOneYoutubeVideoInfo(videoId);

    if (videoInfo) {
      setVideoInfo(videoInfo);
      setYoutubeUrl({ ...youtubeUrl, value: url, validUrl: url });
    } else {
      setVideoInfo(undefined);
      setYoutubeUrl({ ...youtubeUrl, value: url, isWarning: true });
    }
  };

  const validate = () => {
    if (!title || !contents || !videoInfo || !selectedChannel) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    console.log(!youtubeUrl.value);
    !title || !contents || !youtubeUrl.value || !selectedChannel
      ? setIsDisabled(true)
      : setIsDisabled(false);
  }, [title, contents, youtubeUrl, selectedChannel]);

  return (
    <section className="w-full px-16 py-7">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Dropdown channel={selectedChannel} setChannel={setSelectedChannel} />
        <input
          className="border-b py-3 px-2 focus:border-primary border-gray-c8 rounded-lg text-2xl placeholder:text-gray-c8"
          placeholder="제목을 입력하세요"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="border focus-within:border-primary border-gray-c8 rounded-lg overflow-hidden bg-white">
          <textarea
            className="w-full placeholder:text-gray-c8 h-[330px] p-6 resize-none"
            placeholder="내용을 입력해주세요"
            onChange={(e) => setContents(e.target.value)}
          />
        </div>
        <input
          type="url"
          className={twMerge(
            "border placeholder:text-gray-c8 focus:border-primary rounded-lg py-3 px-5",
            youtubeUrl.isWarning ? "border-red-accent" : "border-gray-c8"
          )}
          placeholder="유튜브 url를 입력하세요"
          autoCorrect="off"
          onKeyDown={(e) =>
            e.key === "Enter" && createBookmark(e.currentTarget.value)
          }
          onPaste={(e) => createBookmark(e.clipboardData.getData("text"))}
          onChange={(e) =>
            setYoutubeUrl({
              ...youtubeUrl,
              value: e.target.value,
              isWarning: false,
            })
          }
        />
        <p
          className={twMerge(
            "text-xs leading-7",
            youtubeUrl.isWarning
              ? "text-red-accent"
              : "text-transparent select-none"
          )}
        >
          올바른 유튜브 URL을 입력해주세요.
        </p>
        {videoInfo && (
          <Bookmark
            title={videoInfo.snippet!.title}
            description={videoInfo.snippet!.description}
            url={youtubeUrl.validUrl}
            thumbnail={videoInfo.snippet!.thumbnails.default.url}
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
