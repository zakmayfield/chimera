import { Outlet } from "@remix-run/react";

export default function Auth() {
  return (
    <div className="p-5">
      <div>test</div>
      <Outlet />
    </div>
  );
}
