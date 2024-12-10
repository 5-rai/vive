import { Outlet } from "react-router";

export default function Sidebar() {
  return (
    <div>
      <aside>사이드바</aside>
      <Outlet />
    </div>
  );
}
