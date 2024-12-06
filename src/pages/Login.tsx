import { useState } from 'react';
import Button from '../components/common/Button';
import InputLabel from '../components/common/InputLabel';
import Logo from '../assets/logo.svg';
import { useNavigate } from 'react-router';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState({ value: '', isWarning: false });
  const [password, setPassword] = useState({ value: '', isWarning: false });

  const validate = () => {
    if (!email.value) {
      setEmail({ ...email, isWarning: true });
    }
    if (!password.value) {
      setPassword({ ...password, isWarning: true });
    }

    if (!email.value || !password.value) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    console.log(email, password); // TODO: 로그인 API 연동
  };

  return (
    <section className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[400px] gap-[45px]">
        <img
          src={Logo}
          alt="로고"
          className="mx-auto w-[100px] h-[100px]"
        />
        <div>
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
        <div className="flex flex-col gap-5">
          <Button
            primary
            type="submit">
            로그인
          </Button>
          <Button
            type="button"
            onClick={() => navigate('/register')}>
            회원가입
          </Button>
        </div>
      </form>
    </section>
  );
}
