import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useToastStore } from "../store/toastStore";
import InputLabel from "../components/common/InputLabel";
import { updatePassword } from "../api/user";

export default function ModifyPassword() {
  const [data, setData] = useState({
    password: "",
    passwordCheck: "",
  });
  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();

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

    try {
      await updatePassword(data.password); // axios로 함수 호출
      showToast("비밀번호가 변경되었습니다.");
      navigate("/mypage");
    } catch {
      showToast("비밀번호 변경에 실패했습니다.");
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
