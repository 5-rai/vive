import { axiosInstance } from "./axios";
import { useAuthStore } from "../store/authStore";

// 로그인 요청에 필요한 데이터의 타입 정의
interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답 데이터의 타입 정의
interface LoginResponse {
  token: string;
}

// 로그인 API 함수
export const loginApi = async (data: LoginRequest) => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/login", data);
    useAuthStore.setState({
      accessToken: response.data.token,
      isLoggedIn: true,
    });
    return true;
  } catch (err) {
    if (err instanceof Error) console.error(err);
    return false;
  }
};
