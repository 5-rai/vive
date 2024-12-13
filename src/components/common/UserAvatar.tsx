import DefaultProfileImage from "./DefaultProfileImage";

interface UserAvatarProps {
  id?: string;
  name: string;
  image: string | null;
}

export default function UserAvatar({ name, image }: UserAvatarProps) {
  return (
    <>
      <div className="flex flex-col gap-2 items-center w-[122px] h-[162px]">
        {image ? (
          <img
            src={image}
            alt="프로필 이미지"
            className="w-[122px] h-[122px] rounded-full profile-shadow border border-gray-ee bg-cover dark:border-gray-ee/20"
          />
        ) : (
          <DefaultProfileImage className="w-[122px] h-[122px] p-6 profile-shadow border border-gray-ee bg-cover dark:border-[#4B4B4B]" />
        )}
        <p className="text-lg mt-[10px]">{name}</p>
      </div>
    </>
  );
}
