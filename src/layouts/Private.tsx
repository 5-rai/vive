import { Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { useModalStore } from "../store/modalStore";

function Private() {
  const navigate = useNavigate();
  const [show, setIsShow] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const modalStore = useModalStore();

  useEffect(() => {
    if (!isLoggedIn) {
      modalStore.setModal({
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
          modalStore.setModal({ isOpen: false }); // 모달 닫기
          navigate("/login"); // 로그인 페이지로 이동
        },
        onClose: () => {
          modalStore.setModal({ isOpen: false }); // 모달 닫기
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
