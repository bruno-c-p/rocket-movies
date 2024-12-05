import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function DefaultLayout() {
  return (
    <>
      <Header />
      <main className="pt-[116px]">
        <Outlet />
      </main>
    </>
  );
}
