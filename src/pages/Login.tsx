import { useState } from "react";
import InputLabel from "../components/common/InputLabel";
import AuthButton from "../components/common/AuthButton";
import Logo from "../assets/Logo";
import { loginApi } from "../api/auth";
import { useNavigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState({ value: "", isWarning: false });
  const [password, setPassword] = useState({ value: "", isWarning: false });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validate = (): boolean => {
    let isValid = true;
    if (!email.value) {
      setEmail({ ...email, isWarning: true });
      isValid = false;
    }
    if (!password.value) {
      setPassword({ ...password, isWarning: true });
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    if (!validate()) return;

    const data = await loginApi({
      email: email.value,
      password: password.value,
    }); // LoginRequest 타입의 객체 전달

    if (data) {
      navigate("/");
      console.log("로그인 성공");
    } else {
      setErrorMessage("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center p-[70px]">
      <form onSubmit={handleSubmit} className="flex flex-col w-[400px]">
        <Logo className="mx-auto w-[100px] h-[100px] mb-10" />
        <div className="flex flex-col gap-[10px]">
          <InputLabel
            label="이메일"
            id="email"
            type="email"
            value={email.value}
            message="이메일을 입력해주세요"
            isWarning={email.isWarning}
            onChange={(e) =>
              setEmail({ value: e.target.value, isWarning: false })
            }
          />
          <InputLabel
            label="비밀번호"
            id="password"
            type="password"
            value={password.value}
            message="비밀번호를 입력해주세요"
            isWarning={password.isWarning}
            onChange={(e) =>
              setPassword({ value: e.target.value, isWarning: false })
            }
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
        )}
        <div className="flex flex-col gap-5 mt-24">
          <AuthButton type="submit" primary>
            로그인
          </AuthButton>
          <AuthButton type="button">회원가입 하러가기</AuthButton>
        </div>
      </form>
    </section>
  );
}
