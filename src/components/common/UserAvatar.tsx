interface UserAvatarProps {
  id?: string;
  name: string;
  image: string | null;
}

export default function UserAvatar({ name, image }: UserAvatarProps) {
  return (
    <>
      <div className="flex flex-col gap-2 items-center w-[122px] h-[162px]">
        <img
          src={image || "/logo.png"}
          alt="프로필 이미지"
          className="w-[122px] h-[122px] rounded-full profile-shadow border border-gray-ee bg-cover dark:border-gray-ee/20 bg-white/20"
        />
        <p className="text-lg mt-[10px]">{name}</p>
      </div>
    </>
  );
}
