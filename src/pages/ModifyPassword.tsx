import { useNavigate } from "react-router";
import ModifyProfileInput from "../components/ModifyProfile/ModifyProfileInput";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { axiosInstance } from "../api/axios";

export default function ModifyPassword() {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore.getState(); // accessToken 가져오기
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordCheck(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호 조건 검증
    if (password.length < 8) {
      //setErrorMessage("비밀번호는 8자리 이상이어야 합니다.");
      return;
    }

    if (password !== passwordCheck) {
      //setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 비밀번호 변경 시도
    if (!accessToken) {
      setErrorMessage("사용자가 인증되지 않았습니다.");
      return;
    }

    try {
      await updatePassword(password, accessToken); // axios로 함수 호출
      navigate("/mypage");
    } catch (error) {
      console.error(error);
      setErrorMessage("비밀번호를 변경하는 중 오류가 발생했습니다.");
    }
  };

  // 비밀번호 업데이트 함수 (axios)
  const updatePassword = async (password: string, accessToken: string) => {
    try {
      await axiosInstance.put("/settings/update-password", {
        password,
      });
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  };

  // 비밀번호와 비밀번호 확인 값이 모두 입력되었는지 체크
  const isButtonDisabled = password === "" || passwordCheck === "";

  return (
    <section className="mx-auto flex flex-col items-center justify-center">
      <form className="mt-8" onSubmit={handleSubmit}>
        <ModifyProfileInput
          label="비밀번호"
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호를 입력해주세요"
          message={
            password.length > 0 && password.length < 8
              ? "비밀번호는 8자리 이상이어야 합니다."
              : ""
          }
        />
        <ModifyProfileInput
          label="비밀번호 확인"
          type="password"
          id="passwordCheck"
          value={passwordCheck}
          onChange={handlePasswordCheckChange}
          placeholder="비밀번호를 다시 한번 입력해주세요"
          message={
            passwordCheck.length > 0 && password !== passwordCheck
              ? "비밀번호가 일치하지 않습니다."
              : ""
          }
        />
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        <button
          type="submit"
          className="w-[400px] h-[40px] rounded-[50px] primary-btn"
          disabled={isButtonDisabled} // 버튼 비활성화 조건 추가
        >
          비밀번호 변경
        </button>
      </form>
    </section>
  );
}
