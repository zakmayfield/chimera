import type { LoaderArgs } from "@remix-run/server-runtime";
import { getUser } from "~/models/user.server";
import { requireUserId } from "~/utils/session.server";
import { json } from "@remix-run/node";
import { NavLink, Outlet } from "@remix-run/react";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const user = await getUser(userId);
  return json({ user });
}

const Menu = () => {
  return (
    <div className="px-5 py-2">
      {/* navigation title (could be a logo, greeting, ect) */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold tracking-wide text-blue-700">
          Chimera 🦁
        </h2>
      </div>

      <nav>
        <ul className="flex w-full flex-col gap-2">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `block w-full rounded-xl py-3 pl-4 text-sm hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`}
              end
            >
              <span className="mr-2">❖</span>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="pets/listed"
              className={({ isActive }) => `block w-full rounded-xl py-3 pl-4 text-sm hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`}
            >
              <span className="mr-2">❤︎</span>
              Pets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="account"
              className={({ isActive }) => `block w-full rounded-xl py-3 pl-4 text-sm hover:bg-blue-500 hover:text-white ${isActive ? 'bg-blue-500 text-white' : ''}`}
            >
              <span className="mr-2">⚙︎</span>
              Account
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <div>
      <div className="grid sm:grid-cols-5">
        <Menu />

        <div className="border-2 sm:col-span-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
