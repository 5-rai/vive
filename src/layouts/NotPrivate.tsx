import { Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";

// 인증 안 된 사람만 접근 가능
export default function NotPrivate() {
  const navigate = useNavigate();
  const [show, setIsShow] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
      return;
    }
    setIsShow(true);
  }, []);
  return <>{show && <Outlet />}</>;
}
