import Bookmark from "../components/Write/Bookmark";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { getOneYoutubeVideoInfo } from "../api/youtube";
import { getOnePost, updatePost } from "../api/post";
import { useNavigate, useParams } from "react-router";
import Dropdown from "../components/Write/Dropdown";

const youtubeLinkRegex = /^https:\/\/www\.youtube\.com.*\bv\b/;

export default function ModifyPost() {
  const navigate = useNavigate();
  const { postId } = useParams();

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
    if (!postId) return;
    if (!validate()) return;

    await updatePost({
      title: JSON.stringify({
        title,
        contents,
        youtubeUrl: youtubeUrl.validUrl,
        image: videoInfo!.snippet!.thumbnails.default.url,
      }),
      channelId: selectedChannel!._id,
      postId,
    });
    navigate(`/channels/${selectedChannel!.name}/${postId}`);
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
      setYoutubeUrl({
        ...youtubeUrl,
        value: url,
        validUrl: url,
        isWarning: false,
      });
    } else {
      setVideoInfo(undefined);
      setYoutubeUrl({ ...youtubeUrl, value: url, isWarning: true });
    }
  };

  const validate = () => {
    if (!title || !contents || !selectedChannel || !videoInfo) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const setCurrentPostData = async () => {
      const post = await getOnePost(postId);
      if (!post) return;

      const { title, contents, youtubeUrl }: CustomTitle = JSON.parse(
        post.title
      );
      setTitle(title);
      setContents(contents);
      setSelectedChannel(post.channel);
      setYoutubeUrl({
        value: youtubeUrl,
        validUrl: youtubeUrl,
        isWarning: false,
      });
      createBookmark(youtubeUrl);
    };
    setCurrentPostData();
  }, []);

  useEffect(() => {
    if (!title || !contents || !selectedChannel || !youtubeUrl.value) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [title, contents, youtubeUrl]);

  return (
    <section className="w-full px-16 py-7">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Dropdown channel={selectedChannel} setChannel={setSelectedChannel} />
        <input
          value={title}
          className="border p-3 focus:border-primary text-2xl border-gray-c8 dark:border-gray-c8/50 rounded-lg"
          placeholder="제목을 입력하세요"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="border focus-within:border-primary rounded-lg border-gray-c8 dark:border-gray-c8/50 overflow-hidden p-6 bg-white dark:bg-white/10">
          <textarea
            value={contents}
            className="w-full h-[280px] resize-none bg-transparent custom-scrollbar"
            placeholder="내용을 입력해주세요"
            onChange={(e) => setContents(e.target.value)}
          />
        </div>
        <div>
          <input
            type="url"
            value={youtubeUrl.value}
            className={twMerge(
              "border focus:border-primary rounded-lg w-full py-3 px-5 dark:border-gray-c8/50",
              youtubeUrl.isWarning ? "border-red-accent" : "border-gray-c8"
            )}
            placeholder="유튜브 url를 입력하세요"
            autoCorrect="off"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                createBookmark(e.currentTarget.value);
              }
            }}
            onPaste={(e) => createBookmark(e.clipboardData.getData("text"))}
            onBlur={(e) => createBookmark(e.currentTarget.value)}
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
        </div>
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
