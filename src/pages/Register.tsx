import { useState } from "react";
import InputLabel from "../components/common/InputLabel";
import AuthButton from "../components/common/AuthButton";
import Logo from "../assets/Logo";
import { useLocation, useNavigate } from "react-router";
import { axiosInstance } from "../api/axios";

export default function Register() {
  const [name, setName] = useState({ value: "", isWarning: false });
  const [email, setEmail] = useState({ value: "", isWarning: false });
  const [password, setPassword] = useState({ value: "", isWarning: false });
  const navigate = useNavigate();
  const location = useLocation(); // 현재 위치 가져오기
  const validate = () => {
    const trimeedName = name.value.trim();
    if (!trimeedName) {
      setName({ ...name, value: trimeedName, isWarning: true });
    }
    if (!email.value) {
      setEmail({ ...email, isWarning: true });
    }
    if (!password.value) {
      setPassword({ ...password, isWarning: true });
    }

    if (!trimeedName || !email.value || !password.value) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      axiosInstance.post("/signup", {
        email: email.value,
        fullName: name.value,
        password: password.value,
      });
      alert("회원가입 완료🎉");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      alert("회원가입 실패 ❌ 다시 시도해주세요.");
    }
  };

  return (
    <section className="mx-auto flex screen-100vh items-center justify-center p-[70px]">
      <form onSubmit={handleSubmit} className="flex flex-col w-[400px]">
        <Logo className="mx-auto w-[100px] h-[100px] mb-10" />
        <div className="flex flex-col gap-[10px]">
          <InputLabel
            label="이름"
            id="name"
            type="text"
            value={name.value}
            message="이름을 입력해주세요"
            isWarning={name.isWarning}
            onChange={(e) =>
              setName({ value: e.target.value, isWarning: false })
            }
          />
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
        <div className="flex flex-col gap-5 mt-24">
          <AuthButton type="submit" primary>
            회원 등록
          </AuthButton>
          <AuthButton
            type="button"
            onClick={() => navigate("/login", { state: { from: location } })}
          >
            로그인 하러가기
          </AuthButton>
        </div>
      </form>
    </section>
  );
}
