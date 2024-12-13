import { Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";

function Private() {
  const navigate = useNavigate();
  const [show, setIsShow] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      const isConfirmed = window.confirm(
        "로그인이 필요한 기능입니다. 로그인 하시겠습니까?"
      );
      isConfirmed ? navigate("/login") : navigate("/");
      return;
    }
    setIsShow(true);
  }, []);
  return <>{show && <Outlet />}</>;
}

export default Private;
