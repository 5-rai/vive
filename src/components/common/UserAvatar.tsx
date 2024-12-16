interface UserAvatarProps {
  name: string | undefined;
  image: string | null | undefined;
}

export default function UserAvatar({ name, image }: UserAvatarProps) {
  return (
    <div className="flex flex-col gap-2 items-center w-[122px] h-[162px]">
      <img
        src={image || "/logo.png"}
        alt="프로필 이미지"
        className="w-[122px] h-[122px] rounded-full profile-shadow bg-cover profile"
      />
      <p className="text-lg mt-[10px] dark:text-white">{name}</p>
    </div>
  );
}
