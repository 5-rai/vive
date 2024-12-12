import { Link } from "react-router";
import Profile from "../../assets/profileImg.jpg";

interface ProfileButtonProps {
  profileImage: string | null;
}

export default function ProfileButton({ profileImage }: ProfileButtonProps) {
  return (
    <Link to="/mypage">
      <img
        className="w-[44px] h-[44px] rounded-full profile-shadow"
        src={profileImage || Profile}
        alt="프로필"
      />
    </Link>
  );
}
