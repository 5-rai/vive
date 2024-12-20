import { Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { useModalStore } from "../store/modalStore";

function Private() {
  const navigate = useNavigate();
  const [show, setIsShow] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setModal = useModalStore((state) => state.setModal);

  useEffect(() => {
    if (!isLoggedIn) {
      setModal({
        isOpen: true,
        confirmText: "로그인",
        cancelText: "취소",
        children: (
          <div>
            로그인이 필요한 기능입니다.
            <br />
            로그인 하시겠습니까?
          </div>
        ),
        onConfirm: () => {
          navigate("/login"); // 로그인 페이지로 이동
        },
        onClose: () => {
          navigate("/"); // 홈 페이지로 이동
        },
      });
      return;
    }
    setIsShow(true);
  }, [isLoggedIn]);

  return <>{show && <Outlet />}</>;
}

export default Private;
