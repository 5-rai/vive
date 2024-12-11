import Profile from "../../assets/profileImg.jpg";
import { Link } from "react-router";

export default function ProfileButton() {
  // TODO: 프로필 이미지 없으면 디폴트가 보여지도록 수정해야함
  return (
    <Link to="/mypage">
      <button>
        <img
          className="w-[44px] h-[44px] rounded-full profile-shadow"
          src={Profile}
          alt="프로필"
        />
      </button>
    </Link>
  );
}
