import { useNavigate } from "react-router";
import { useAllUserStore } from "../../store/allUserStore";

export default function WeeklyArtist({
  name,
  images,
  userId,
}: {
  name: string;
  images: string;
  userId: string;
}) {
  const navigate = useNavigate();
  const artistClick = () => {
    navigate(`/user/${userId}`);
  };

  return (
    <div
      onClick={artistClick}
      className="hover:cursor-pointer justify-between items-start inline-flex"
    >
      <div className="w-[122px]">
        <img
          className="w-[122px] h-[122px] rounded-full profile-shadow mb-[10px]"
          src={images}
          alt={`${name} 프로필 이미지`}
        />
        <div className="whitespace-nowrap text-lg truncate font-normal text-center">
          {name}
        </div>
      </div>
    </div>
  );
}
