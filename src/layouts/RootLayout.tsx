import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <>
      {/* 추후에 Header 컴포넌트로 대체 */}
      <header>header</header>
      <Outlet />
    </>
  );
}
