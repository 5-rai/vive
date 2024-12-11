import { axiosInstance } from "./axios";

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
export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/login", data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
