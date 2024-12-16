import { NavigateFunction } from "react-router";
import { useAuthStore } from "../store/authStore";

const confirmAndNavigateToLogin = (navigate: NavigateFunction) => {
  const isLoggedIn = useAuthStore.getState().isLoggedIn;
  if (!isLoggedIn) {
    const isConfirmed = window.confirm(
      "로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?"
    );
    isConfirmed && navigate("/login");
  }
};

export default confirmAndNavigateToLogin;
