import { NavigateFunction } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useModalStore } from "../store/modalStore";

const confirmAndNavigateToLogin = (navigate: NavigateFunction) => {
  const isLoggedIn = useAuthStore.getState().isLoggedIn;

  if (!isLoggedIn) {
    // 모달 상태를 설정
    useModalStore.setState({
      isOpen: true,
      confirmText: "확인",
      cancelText: "취소",
      children: (
        <div>
          로그인이 필요합니다 <br /> 로그인페이지로 이동하시겠습니까?
        </div>
      ),
      onConfirm: () => {
        useModalStore.setState({ isOpen: false }); // 모달 닫기
        navigate("/login"); // 로그인 페이지로 이동
      },
      onClose: () => {
        useModalStore.setState({ isOpen: false }); // 모달 닫기
      },
    });
  }
};

export default confirmAndNavigateToLogin;
