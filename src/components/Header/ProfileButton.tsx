import Profile from "../../assets/profileImg.jpg";
import { Link } from "react-router";

export default function ProfileButton() {
  return (
    <Link to="/mypage">
      <button>
        <img
          className="w-[44px] h-[44px] rounded-full shadow-[0px_0px_8px_rgba(0,0,0,0.25)]"
          src={Profile}
          alt="프로필"
        />
      </button>
    </Link>
  );
}
