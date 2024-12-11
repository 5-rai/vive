import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/authStore";

export default function LogoutButton() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // 로그아웃 상태로 설정
    navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <button
      type="button"
      className="primary-btn rounded-full h-10 w-[106px] text-base font-medium"
      onClick={handleLogout}
    >
      로그아웃
    </button>
  );
}
