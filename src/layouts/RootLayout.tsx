import { Outlet } from "react-router";
import Header from "./Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className="flex w-full">
        <Outlet />
      </main>
    </>
  );
}
