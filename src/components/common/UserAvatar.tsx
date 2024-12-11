import ProfileTemp from "../../assets/profileImg.jpg";
import Logo from "../../assets/Logo";

const TEMP_USER_AVATAR = {
  name: "음악하는 다람쥐",
  image: ProfileTemp,
};

export default function UserAvatar() {
  return (
    <>
      <div className="flex flex-col gap-2 items-center w-[122px] h-[162px]">
        {TEMP_USER_AVATAR.image ? (
          <img
            src={TEMP_USER_AVATAR.image}
            alt="프로필 이미지"
            className="w-[122px] h-[122px] rounded-full profile-shadow border border-gray-ee bg-cover"
          />
        ) : (
          <div className="w-[122px] h-[122px] rounded-full flex items-center justify-center border border-gray-ee profile-shadow bg-cover">
            <Logo className="h-16 w-16" />
          </div>
        )}
        <p className="text-lg mt-[10px]">{TEMP_USER_AVATAR.name}</p>
      </div>
    </>
  );
}
