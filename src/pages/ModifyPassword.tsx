import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { axiosInstance } from "../api/axios";
import { useToastStore } from "../store/toastStore";
import InputLabel from "../components/common/InputLabel";

export default function ModifyPassword() {
  const { showToast } = useToastStore();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore.getState();
  const [data, setData] = useState({
    password: "",
    passwordCheck: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data.password !== data.passwordCheck) return;

    // 비밀번호 변경 시도
    if (!isLoggedIn) {
      setErrorMessage("사용자가 인증되지 않았습니다.");
      return;
    }

    try {
      await updatePassword(data.password); // axios로 함수 호출
      showToast("비밀번호가 변경되었습니다.", 1000);
      navigate("/mypage");
    } catch (error) {
      console.error(error);
      setErrorMessage("비밀번호를 변경하는 중 오류가 발생했습니다.");
    }
  };

  // 비밀번호 업데이트 함수 (axios)
  const updatePassword = async (password: string) => {
    try {
      await axiosInstance.put("/settings/update-password", {
        password,
      });
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  };

  // 비밀번호 변경 버튼 비활성화 조건
  const isDisabled =
    !data.password ||
    !data.passwordCheck ||
    (data.passwordCheck.length > 0 && data.password !== data.passwordCheck);

  return (
    <section className="mx-auto flex flex-col items-center justify-center">
      <form className="mt-8" onSubmit={handleSubmit}>
        <InputLabel
          label="비밀번호"
          id="password"
          type="password"
          value={data.password}
          placeholder="비밀번호를 입력해주세요"
          password
          onChange={handleChange}
        />
        <InputLabel
          label="비밀번호 확인"
          id="passwordCheck"
          type="password"
          value={data.passwordCheck}
          placeholder="비밀번호를 다시 한번 입력해주세요"
          errorMessage="비밀번호가 일치하지 않습니다."
          isWarning={
            data.passwordCheck.length > 0 &&
            data.password !== data.passwordCheck
          }
          password
          onChange={handleChange}
        />
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        <div className="flex flex-col gap-5 mt-24">
          <button
            type="submit"
            className="w-[400px] h-[40px] rounded-[50px] primary-btn"
            disabled={isDisabled}
          >
            비밀번호 변경
          </button>
          <Link to="/mypage">
            <button
              type="button"
              className="w-[400px] py-2 rounded-[50px] secondary-btn"
            >
              취소
            </button>
          </Link>
        </div>
      </form>
    </section>
  );
}
