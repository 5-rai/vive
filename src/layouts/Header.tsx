import Logo from '../assets/logo.svg';

export default function Header() {
  // TODO: 로그인 여부에 따라 버튼 다르게 구성
  return (
    <header className="fixed top-0 left-0 w-screen px-10 h-[70px] items-center flex border-gray-30 border-b justify-between">
      <img
        src={Logo}
        alt="로고"
        className="w-[45px] h-[45px]"
      />
      <nav>
        <button className="text-gray-80">로그인</button>
      </nav>
    </header>
  );
}
