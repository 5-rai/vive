import { Link } from "react-router";

interface ProfileButtonProps {
  profileImage: string | null | undefined;
}

export default function ProfileButton({ profileImage }: ProfileButtonProps) {
  return (
    <Link to="/mypage">
      <img
        className="w-[44px] h-[44px] rounded-full profile-shadow bg-white/20"
        src={profileImage || "/logo.png"}
        alt="프로필"
      />
    </Link>
  );
}
