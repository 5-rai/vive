import Logo from "../assets/logo.svg";

export default function Header() {
  // TODO: 다시 구현해야 함
  return (
    <header className="fixed bg-white top-0 left-0 w-screen px-10 h-[70px] items-center flex border-gray-30 border-b justify-between">
      <img src={Logo} alt="로고" className="w-[45px] h-[45px]" />
      <nav>
        <button className="text-gray-80">로그인</button>
      </nav>
    </header>
  );
}
