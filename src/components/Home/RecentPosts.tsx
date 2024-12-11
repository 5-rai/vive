import { useNavigate } from "react-router";

export default function RecentPosts({
  title,
  youtubeTitle,
  youtubeThumbnail,
  avatarImg,
}: {
  title: string;
  youtubeTitle: string;
  youtubeThumbnail: string;
  avatarImg: string;
}) {
  const navigate = useNavigate();
  const postClick = () => {
    navigate("");
  };
  const avatarClick = () => {
    navigate("");
  };
  return (
    <div
      onClick={postClick}
      className="hover:cursor-pointer border-t-[24px] border-t-transparent w-[208px] h-[276px] rounded-lg flex-col justify-start items-start inline-flex"
    >
      <div className="relative h-[178px] rounded-tl-lg rounded-tr-lg border-r border-[#ededed] overflow-hidden">
        {/* 유튜브 썸네일 이미지 */}
        <img
          className="w-[208px] h-[178px] object-cover"
          src={youtubeThumbnail}
        />

        {/* 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>

        {/* 아바타와 텍스트 */}
        <div
          onClick={avatarClick}
          className="absolute left-2 bottom-2 flex items-center gap-2"
        >
          <div className="w-6 h-6 justify-center items-center flex">
            <img className="w-6 h-6 rounded-full" src={avatarImg} />
          </div>
          <div className="text-gray-c8 text-sm font-medium leading-snug">
            avatar
          </div>
        </div>
      </div>

      <div className="self-stretch h-[98px] p-2 bg-white rounded-bl-lg rounded-br-lg border-l border-r border-b border-[#ededed] flex-col justify-start items-start gap-2 flex">
        <div className="self-stretch text-[#222222] text-base font-semibold uppercase leading-[30px]">
          {title}
        </div>
        <div className="self-stretch text-[#c8c8c8] text-sm font-normal uppercase leading-snug">
          {youtubeTitle.length > 13
            ? `${youtubeTitle.slice(0, 13)}...`
            : youtubeTitle}
        </div>
      </div>
    </div>
  );
}
