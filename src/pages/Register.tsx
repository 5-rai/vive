import { useState } from "react";
import InputLabel from "../components/common/InputLabel";
import AuthButton from "../components/common/AuthButton";
import Logo from "../assets/Logo";
import { useNavigate } from "react-router";
import { useToastStore } from "../store/toastStore";
import { signup } from "../api/auth";

export default function Register() {
  const [name, setName] = useState({
    value: "",
    isWarning: false,
    errorMessage: "",
  });
  const [email, setEmail] = useState({ value: "", isWarning: false });
  const [password, setPassword] = useState({ value: "", isWarning: false });
  const navigate = useNavigate();
  const { showToast } = useToastStore();

  const validate = () => {
    if (!name.value) {
      setName({
        ...name,
        isWarning: true,
        errorMessage: "이름을 입력해주세요.",
      });
    } else if (!name.value.trim()) {
      setName({
        ...name,
        isWarning: true,
        errorMessage: "공백만 있는 이름은 사용할 수 없습니다.",
      });
    } else if (name.value.length > 7) {
      setName({
        ...name,
        isWarning: true,
        errorMessage: "이름은 최대 7자까지만 입력할 수 있습니다.",
      });
    }

    if (!email.value) {
      setEmail({ ...email, isWarning: true });
    }

    if (!password.value) {
      setPassword({ ...password, isWarning: true });
    }

    if (
      !name.value ||
      !name.value.trim() ||
      name.value.length > 7 ||
      !email.value ||
      !password.value
    )
      return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await signup({
      email: email.value,
      fullName: name.value.trim(),
      password: password.value,
    });

    if (result) {
      showToast("회원가입이 완료되었습니다.");
      navigate("/login");
    } else {
      showToast("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <section className="mx-auto flex screen-100vh items-center justify-center p-[70px]">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <Logo className="mx-auto w-auto h-[100px] mb-10" />
        <div className="flex flex-col gap-5">
          <InputLabel
            label="이름"
            id="name"
            type="text"
            value={name.value}
            placeholder="이름을 입력해주세요 (7자 이내)"
            errorMessage={name.errorMessage}
            isWarning={name.isWarning}
            onChange={(e) =>
              setName((prev) => ({
                ...prev,
                value: e.target.value,
                isWarning: false,
              }))
            }
          />
          <InputLabel
            label="이메일"
            id="email"
            type="email"
            value={email.value}
            placeholder="이메일을 입력해주세요"
            isWarning={email.isWarning}
            onChange={(e) =>
              setEmail((prev) => ({
                ...prev,
                value: e.target.value,
                isWarning: false,
              }))
            }
          />
          <InputLabel
            label="비밀번호"
            id="password"
            type="password"
            value={password.value}
            placeholder="비밀번호를 입력해주세요"
            isWarning={password.isWarning}
            password
            onChange={(e) =>
              setPassword((prev) => ({
                ...prev,
                value: e.target.value,
                isWarning: false,
              }))
            }
          />
        </div>
        <div className="flex flex-col gap-5 mt-24">
          <AuthButton type="submit" primary>
            회원 등록
          </AuthButton>
          <AuthButton type="button" onClick={() => navigate("/login")}>
            로그인 하러가기
          </AuthButton>
        </div>
      </form>
    </section>
  );
}
