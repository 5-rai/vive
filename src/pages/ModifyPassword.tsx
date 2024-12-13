import { useNavigate } from "react-router";
import ModifyProfileInput from "../components/ModifyProfile/ModifyProfileInput";

export default function ModifyPassword() {
  const navigate = useNavigate();
  return (
    <section className="mx-auto flex flex-col items-center justify-center">
      <form className="mt-8">
        <ModifyProfileInput
          label="비밀번호"
          type="password"
          id="password"
          placeholder="비밀번호를 입력해주세요"
          message="비밀번호를 8자리 이상 입력해주세요."
        />
        <ModifyProfileInput
          label="비밀번호 확인"
          type="password"
          id="passwordCheck"
          placeholder="비밀번호를 다시 한번 입력해주세요"
          message="비밀번호가 다릅니다."
        />
        <button
          type="submit"
          className="w-[400px] h-[40px] rounded-[50px] primary-btn"
          onClick={() => {
            navigate("/mypage");
          }}
        >
          비밀번호 변경
        </button>
      </form>
    </section>
  );
}
